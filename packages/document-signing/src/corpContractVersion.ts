import { type Address, parseAbi } from "viem";

/**
 * Corp contracts carry a `DEPLOY_VERSION` and each corp owner upgrades on their
 * own cadence, so the app has to talk to both eras at once.
 *
 * The version is read per CONTRACT, not per corp: `DEPLOY_VERSION` lives on
 * IssuanceManager, DealManager, RoundManager, CyberCorp and LedgerEntryToken
 * separately. A corp is expected to upgrade them together, but nothing in this
 * app enforces that, so each call site gates on the contract it is about to
 * write to.
 *
 * Contract versions can use either a major version ("5") or semantic versioning
 * ("4.0.1"). Compatibility decisions use the major version.
 */
export const CORP_V5_MAJOR_VERSION = 5;
/**
 * The newest major this app knows how to talk to. A contract reporting a
 * higher one is unknown, not "v5 or better": its call shapes have not been
 * written against, so treating it as v5 would send a payload nothing has
 * agreed on. Raise this deliberately when a new era is actually supported.
 */
export const MAX_SUPPORTED_CORP_MAJOR_VERSION = CORP_V5_MAJOR_VERSION;

const SEMVER_PATTERN =
  /^v?(\d+)(?:\.(\d+))?(?:\.\d+)?(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

/**
 * Parse a contract version into its major and minor parts. A version with no
 * minor part ("5") has minor 0. Compatibility decisions still use the major
 * (`parseCorpContractMajorVersion`); the minor only selects a capability that
 * a minor release added, such as the RoundManager 5.1 minimum raise.
 */
export const parseCorpContractVersion = (
  raw: unknown,
): { major: number; minor: number } | undefined => {
  if (typeof raw !== "string") return undefined;

  const match = SEMVER_PATTERN.exec(raw.trim());
  if (!match) return undefined;

  const major = Number(match[1]);
  const minor = match[2] === undefined ? 0 : Number(match[2]);
  return Number.isSafeInteger(major) && Number.isSafeInteger(minor)
    ? { major, minor }
    : undefined;
};

/** Parse a contract version and return its compatibility-significant major. */
export const parseCorpContractMajorVersion = (
  raw: unknown,
): number | undefined => parseCorpContractVersion(raw)?.major;

/**
 * Whether this app supports a contract major at all. Legacy (1-3) and v4 stay
 * supported alongside v5; anything below 1 or above the newest supported major
 * is unknown and has to refuse rather than route.
 */
export const isSupportedCorpContractMajor = (
  majorVersion: number | undefined,
): boolean =>
  majorVersion !== undefined &&
  Number.isSafeInteger(majorVersion) &&
  majorVersion >= 1 &&
  majorVersion <= MAX_SUPPORTED_CORP_MAJOR_VERSION;

/**
 * The compatibility-significant part of a version, or `undefined` when the app
 * cannot support it.
 *
 * A retained signature is compared across a boundary on THIS value, not on the
 * raw string: a major change means a different era and invalidates what was
 * reviewed and signed, while a minor or patch upgrade does not.
 */
export const supportedCorpContractMajor = (
  raw: unknown,
): number | undefined => {
  const major = parseCorpContractMajorVersion(raw);
  return isSupportedCorpContractMajor(major) ? major : undefined;
};

/**
 * A tri-state on purpose. `undefined` means the version is not known yet (still
 * loading, or the read failed) — callers must not treat that as either era,
 * because guessing wrong sends a call with the wrong selector.
 */
export type CorpContractEra = "v4" | "v5" | undefined;

export const corpContractEra = (
  majorVersion: number | undefined,
): CorpContractEra => {
  if (!isSupportedCorpContractMajor(majorVersion)) return undefined;
  return majorVersion! >= CORP_V5_MAJOR_VERSION ? "v5" : "v4";
};

/** True only when the contract major version is v5 or later. */
export const isV5Corp = (majorVersion: number | undefined): boolean =>
  corpContractEra(majorVersion) === "v5";

/** True only when the contract major version is pre-v5. */
export const isV4Corp = (majorVersion: number | undefined): boolean =>
  corpContractEra(majorVersion) === "v4";

/**
 * Imperative read for write paths whose target address is only known at call
 * time (a cert printer chosen in the UI, say). Reads fresh rather than from a
 * cache: routing the wrong way sends the wrong selector.
 */
export const readCorpContractMajorVersion = async ({
  client,
  address,
}: {
  client: {
    readContract: (args: {
      address: Address;
      abi: readonly unknown[];
      functionName: string;
    }) => Promise<unknown>;
  };
  address: Address;
}): Promise<number | undefined> => {
  try {
    const raw = await client.readContract({
      address,
      abi: parseAbi(["function DEPLOY_VERSION() view returns (string)"]),
      functionName: "DEPLOY_VERSION",
    });
    return parseCorpContractMajorVersion(raw);
  } catch {
    return undefined;
  }
};
