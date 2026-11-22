import type { Address, Hex } from "viem";
import {
  arbitrum,
  base,
  baseSepolia,
  mainnet,
  robinhood,
  sepolia,
} from "viem/chains";
import {
  BOUND_AGREEMENT_DOMAIN,
  BOUND_TEMPLATE_DOMAIN,
  CONDITIONED_BOUND_AGREEMENT_DOMAIN,
} from "../creatorBoundAgreement";
import type {
  RegistryCompatibilityMatrix,
  ReviewedRegistryRuntime,
} from "./registryCompatibilityCore";

/**
 * v5 registry runtimes, reviewed 2026-09-26. Every configured chain shares the
 * proxy below; each runs its own deployment of one v5 build. The Ethereum
 * implementation has Sourcify exact-match source verification. The others
 * match its runtime bytecode except for the UUPS self address (two
 * occurrences) and the 51-byte CBOR metadata.
 *
 * The mainnet implementations were pre-deployed for the v5 upgrade
 * (cybercorps-contracts b16eb53, script/res/gnosis-batch-upgrade-v5-*.json).
 * Until that upgrade runs, a mainnet probe resolves the v4 implementation
 * 0xa395…9Ab0A and refuses with implementation-address-mismatch.
 *
 * v5 createContract hashes (templateId, salt, globalValues, parties,
 * secretHash, finalizer), the reviewed `lifecycle-bound-v2` algorithm, and its
 * SignatureData type binds `signer`. Any bytecode or implementation-address
 * change requires a new source/parity review before this allowlist is updated.
 *
 * On 2026-10-23 Ethereum, Base and Arbitrum moved to the creator-bound build
 * (cybercorps-contracts PR #185, commit 68c8e75; not yet merged or
 * source-verified). Its runtime equals a 68c8e75 build on all three chains
 * except the UUPS self address, the linked CyberAgreementJson library address
 * (0xafc765a23c6746d6d99a3e910b7395405c8d9ecf, same code hash on each chain)
 * and the CBOR metadata. The PR base 55d5840 builds the earlier v5 runtime in
 * the same way, so the reviewed source change is 55d5840..68c8e75: it adds
 * createBoundContract and createBoundContractAndSignFor and moves
 * getContractJson into the library. createContract, signContract,
 * signContractFor, the id recipe, SIGNATUREDATA_TYPEHASH and DOMAIN_SEPARATOR
 * are unchanged. The earlier v5 runtimes stay as retained reviews, so reads
 * pinned to a block before the upgrade still resolve.
 *
 * On 2026-10-28 Ethereum Sepolia moved to the signer-conditions build
 * (cybercorps-contracts feat/creator-bound-zkpassport-condition, commit
 * edbe9c36; not yet merged or source-verified). Its runtime equals an edbe9c36
 * build except the UUPS self address, the linked CyberAgreementBound
 * (0xe8788a560f68a497c23cddcafa4728b175e93415) and CyberAgreementJson
 * (0x7ccd9cf37b17b1433df67724b18c5c3df7ec9e8e) library addresses and the CBOR
 * metadata. The linked CyberAgreementBound runtime equals the build except its
 * library deploy address and metadata. The build adds the creator-bound entry
 * points with signer conditions and signContractWithEvidenceFor. The earlier
 * v5 runtime stays as a retained review.
 *
 * On 2026-10-29 Base, Arbitrum and Base Sepolia moved to the same
 * signer-conditions build (cybercorps-contracts upgrade-v5 and upgrade-core
 * broadcasts at d397f34c, fe1cb4aa and 6fa15bb9; no src change from edbe9c36).
 * Each runtime equals the Ethereum Sepolia runtime except the UUPS self
 * address (two occurrences) and the CBOR metadata. The linked libraries share
 * the Ethereum Sepolia addresses and code hashes. The earlier runtimes stay as
 * retained reviews.
 *
 * On 2026-10-30 Ethereum moved to the same signer-conditions build
 * (cybercorps-contracts script/res/gnosis-batch-upgrade-v5-1.json; Safe nonce
 * 171). Its runtime has the same parity as the other signer-conditions chains.
 *
 * Robinhood Chain (4663) runs the same signer-conditions build since its v5
 * upgrade (cybercorps-contracts script/res/gnosis-batch-upgrade-v5-4663.json,
 * executed 2026-10-30). Read 2026-11-01: its runtime equals the Base runtime
 * except the UUPS self address, the CBOR metadata and its own linked
 * CyberAgreementJson (0x619a472a9d29eac673a95e2c92835e593c6e575a) and
 * CyberAgreementBound (0xd3c4a2a42901728c35ab5b83de7200537681531f) addresses.
 * Each linked library runtime equals the Base library except its deploy
 * address and metadata. The proxy runtime has the shared code hash. It has no
 * earlier v5 runtime to retain: no agreement was created on it before.
 */
const REGISTRY_PROXY_CODE_HASH =
  "0x9fed5577f33d8256e2245117dc124ab271a5234972f6fe7c35252e9d109a79d9";

const v5Review = (
  implementationAddress: Address,
  implementationCodeHash: Hex,
): ReviewedRegistryRuntime => ({
  algorithmVersion: "lifecycle-bound-v2",
  implementationAddress,
  implementationCodeHash,
  proxyCodeHash: REGISTRY_PROXY_CODE_HASH,
  reviewedAt: "2026-09-26",
  reviewReference:
    "Sourcify exact-match Ethereum (1) source for CyberAgreementRegistry implementation 0xb87742F0743949EA1cBe0d2427CB8D41101EEBAD; per-chain runtime parity except UUPS self address and metadata; notes/ai/tasks/registry-agreement-id-compat.md",
});

const creatorBoundReview = (
  implementationAddress: Address,
  implementationCodeHash: Hex,
): ReviewedRegistryRuntime => ({
  algorithmVersion: "lifecycle-bound-v2",
  implementationAddress,
  implementationCodeHash,
  proxyCodeHash: REGISTRY_PROXY_CODE_HASH,
  creatorBound: {
    templateDomain: BOUND_TEMPLATE_DOMAIN,
    agreementDomain: BOUND_AGREEMENT_DOMAIN,
  },
  reviewedAt: "2026-10-23",
  reviewReference:
    "Runtime bytecode equal to cybercorps-contracts 68c8e75 (PR #185) except UUPS self address, linked CyberAgreementJson address and metadata; reviewed source change 55d5840..68c8e75; notes/ai/tasks/registry-creator-bound.md",
});

const signerConditionsReview = (
  implementationAddress: Address,
  implementationCodeHash: Hex,
): ReviewedRegistryRuntime => ({
  algorithmVersion: "lifecycle-bound-v2",
  implementationAddress,
  implementationCodeHash,
  proxyCodeHash: REGISTRY_PROXY_CODE_HASH,
  creatorBound: {
    templateDomain: BOUND_TEMPLATE_DOMAIN,
    agreementDomain: BOUND_AGREEMENT_DOMAIN,
    signerConditions: {
      conditionedAgreementDomain: CONDITIONED_BOUND_AGREEMENT_DOMAIN,
      evidenceTypehash:
        "0xc515657932ac39b81e04753c16bec4de4d8f35b17a1c949344c20fb7fe5113e9",
    },
  },
  reviewedAt: "2026-10-28",
  reviewReference:
    "Runtime bytecode equal to cybercorps-contracts edbe9c36 except UUPS self address, linked CyberAgreementBound and CyberAgreementJson addresses and metadata; notes/ai/tasks/cybersign-zkpassport-gate.md",
});

/**
 * Sender-registered creation (an account that is not a party sends the
 * unsigned `createBoundContract`; each party's signature is recorded with
 * `signContractFor`), declared only where the fork test passed on the
 * reviewed runtime. Every other runtime refuses it.
 */
const withSenderRegistered = (
  review: ReviewedRegistryRuntime,
): ReviewedRegistryRuntime => ({
  ...review,
  senderRegistered: {
    reviewedAt: "2026-11-11",
    reviewReference:
      "packages/document-signing/src/server/senderBoundRegistry.fork.test.ts passed 2026-11-11 on pinned forks of each declaring runtime (Base Sepolia block 57388000, Base block 56046000, Ethereum block 26391900, Arbitrum One block 523287000, Robinhood Chain block 111729000, Ethereum Sepolia block 12111900): non-party creation, signContractFor by a third account through finalization, Multicall3 misbinding, creator-bound ids, solo void by parties[0], expiry",
  },
});

/**
 * Server-only creation allowlist. The explicit registry-address matrix is used
 * instead of the grants registry fallback so an arbitrary chain ID can never
 * inherit write support accidentally.
 */
export const GOVERNANCE_DOCUMENT_REGISTRY_MATRIX: RegistryCompatibilityMatrix =
  {
    [mainnet.id]: {
      registryAddress: "0xa9E808B8eCBB60Bb19abF026B5b863215BC4c134",
      review: withSenderRegistered(
        signerConditionsReview(
          "0x3EEEDcCdDdaB393541901E90B1b43a0b511d69Cf",
          "0xc4b4b7cf9eacf24c90f52ac40c1d860264d10ee9ddce0e2d05470ef85657bd61",
        ),
      ),
      retainedReviews: [
        creatorBoundReview(
          "0x28fCe50351F9A76edb4Ff3625B1DAe65B60B5523",
          "0xb7958de09f067b7ffdcc7b944fcc102372395c1b5d1edb9639b290d6213eddd8",
        ),
        v5Review(
          "0xb87742F0743949EA1cBe0d2427CB8D41101EEBAD",
          "0x6436e3b6b3c4bb50da2c99c1cf1e11861275334ca4cd0fd308a8b66492ac9eb4",
        ),
      ],
    },
    [arbitrum.id]: {
      registryAddress: "0xa9E808B8eCBB60Bb19abF026B5b863215BC4c134",
      review: withSenderRegistered(
        signerConditionsReview(
          "0x62dF59551c9251AE900b1d888938CF5246f7d262",
          "0x920adfca4f8cb629d9e08107801f1d0dcb5269e97fd9c2aa1ea9b3ba282da14b",
        ),
      ),
      retainedReviews: [
        creatorBoundReview(
          "0x46C32a4a7fB22D4a03F41E19f84a65b0eA9bC032",
          "0x2346174f2575fd9025f5bb43289456ba0b0eb80e353c72cf5a0e0989717f0d60",
        ),
        v5Review(
          "0x7Ea6e424EA8FFe820849886eB8223c86F26DC65f",
          "0x40859512dafe7cb06df5bc840b211b08daea2a108fb3577d452c37d2d6628d0e",
        ),
      ],
    },
    [sepolia.id]: {
      registryAddress: "0xa9E808B8eCBB60Bb19abF026B5b863215BC4c134",
      review: withSenderRegistered(
        signerConditionsReview(
          "0xF60db03c3B69cA97ce45A6e49969B5db928ca5C1",
          "0x040591789a30ea11bfe51c9adc27a59b9a1f2fff4659f90fcbdad8e04af4e0db",
        ),
      ),
      retainedReviews: [
        v5Review(
          "0xcEc5C3908F65514d0E8a912eEb65CDF07eA6c809",
          "0x2e446a1f7b6041dee00a94a0a81a532a25ed4822bc0a32450c71d97721e40c51",
        ),
      ],
    },
    [base.id]: {
      registryAddress: "0xa9E808B8eCBB60Bb19abF026B5b863215BC4c134",
      review: withSenderRegistered(
        signerConditionsReview(
          "0x239Ef1C2F037e0AE2ED4c2c9B4196d8ffe738ea9",
          "0xe7ad8caff941cabcc190a4bc90ef24df6c56eff7147310d9f773b3a841675e6d",
        ),
      ),
      retainedReviews: [
        creatorBoundReview(
          "0x04295Bc98728a972c9f3DdCEd5cCFF5C78760F34",
          "0xe0b97104613d8089c24e5fc62cd686b4316ade5c1b985323552f5107265e9e54",
        ),
        v5Review(
          "0x867A9F6408c07F1D006c46Aa2BF1d1C5Ef111315",
          "0xfcf551173b4b26e96ba48506f4f001490c0d394379adfe2df7e5f7b20313230d",
        ),
      ],
    },
    [robinhood.id]: {
      registryAddress: "0xa9E808B8eCBB60Bb19abF026B5b863215BC4c134",
      review: withSenderRegistered(
        signerConditionsReview(
          "0xeAbeda8E939D570456Ae2BAF8Bf2dD32c3810256",
          "0xd515d31e8345d79d897e86e61a7854a31d4cafff5b2ab31c2c1d696a830f3409",
        ),
      ),
    },
    [baseSepolia.id]: {
      registryAddress: "0xa9E808B8eCBB60Bb19abF026B5b863215BC4c134",
      review: withSenderRegistered(
        signerConditionsReview(
          "0xeA35a5b3Fa593Fe2f642a41D871a470bb4954ec5",
          "0x0880591f9a40a7511083690ab5cee6d8a4ecbb8f20c5a5bd9bc41a2c7fefc178",
        ),
      ),
      retainedReviews: [
        v5Review(
          "0x3586B7f707aeb662CbB5a30B6855aABBAA85d920",
          "0x86f4fe94be4895eafee62a6c87e27455f2a6e27dc98f4f497bf9356c09ac427e",
        ),
      ],
    },
  };
