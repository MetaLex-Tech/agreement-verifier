/**
 * The description of a contracting party that is an entity: its entity type
 * and its jurisdiction of organization, as in "a Delaware corporation". One
 * rule serves every agreement that records the two values.
 */

/** Common answers. A party can type another entity type or jurisdiction. */
export const entityTypeSuggestions = [
  "corporation",
  "limited liability company",
  "limited partnership",
  "limited liability partnership",
  "foundation",
  "company limited by shares",
  "unincorporated association",
] as const;
export const jurisdictionSuggestions = [
  "Delaware",
  "Wyoming",
  "Texas",
  "Cayman Islands",
  "British Virgin Islands",
  "England and Wales",
] as const;

/** The recorded entity type and jurisdiction of a party that is an individual. */
export const notApplicableEntityValue = "Not applicable";

// A word that starts with a vowel letter but a consonant sound takes "a":
// "a Utah corporation", "a United Kingdom company", "a European company".
const consonantSound = /^(?:u(?:ni|ta|k|s|ga|ru)|eu)/;
// An abbreviation is read by the name of its first letter: "an EU company",
// "an ADGM company", "a UAE company", "a U.S. Virgin Islands company".
const abbreviation = /^(?:[A-Z]{2,}\b|(?:[A-Z]\.){2,})/;
const vowelSoundLetters = "AEFHILMNORSX";

/**
 * "a" or "an" for the word that follows, by its first sound. The sale
 * agreement's Typst source applies the same rule to the jurisdiction; a test
 * compares the two.
 */
export function indefiniteArticle(word: string): "a" | "an" {
  const start = word.trim();
  if (abbreviation.test(start))
    return vowelSoundLetters.includes(start[0]!) ? "an" : "a";
  const lower = start.toLowerCase();
  return /^[aeiou]/.test(lower) && !consonantSound.test(lower) ? "an" : "a";
}

/** "a Delaware corporation", "an Ohio limited liability company". The values
 * print as entered. */
export function entityDescription(entityType: string, jurisdiction: string) {
  const place = jurisdiction.trim();
  return `${indefiniteArticle(place)} ${place} ${entityType.trim()}`;
}

/**
 * A party as an agreement names it: "Example Labs, Inc., a Delaware
 * corporation" for an entity with both values, "Example Person, an individual"
 * for an individual, and the name alone when a value is missing or is the
 * individual's "Not applicable".
 */
export function partyDescription(
  name: string,
  party: { type?: string; entityType?: string; jurisdiction?: string },
) {
  const legalName = name.trim();
  if (party.type === "Individual") return `${legalName}, an individual`;
  const recorded = (value?: string) => {
    const text = value?.trim() ?? "";
    return text && text !== notApplicableEntityValue ? text : "";
  };
  const entityType = recorded(party.entityType);
  const jurisdiction = recorded(party.jurisdiction);
  return entityType && jurisdiction
    ? `${legalName}, ${entityDescription(entityType, jurisdiction)}`
    : legalName;
}
