import type {
  FieldCondition,
  LegalDocumentField,
  LegalDocumentMetadata,
  LegalDocumentValues,
} from "./schema";
import { normalizeLegalDocumentString } from "./valueNormalization";

const normalizeConditionValue = (value: unknown) =>
  typeof value === "string" ? normalizeLegalDocumentString(value) : value;

const isChecked = (value: unknown) =>
  value === true || normalizeConditionValue(value) === "true";

export function evaluateFieldCondition(
  condition: FieldCondition | undefined,
  values: LegalDocumentValues,
): boolean {
  if (!condition) return true;

  const currentValue = Object.hasOwn(values, condition.field)
    ? normalizeConditionValue(values[condition.field])
    : undefined;
  const expectedValue = normalizeConditionValue(condition.value);
  const equalsExpectedValue =
    currentValue === expectedValue ||
    (currentValue !== undefined &&
      expectedValue !== undefined &&
      String(currentValue) === String(expectedValue));
  switch (condition.operator) {
    case "equals":
      return equalsExpectedValue;
    case "notEquals":
      return !equalsExpectedValue;
    case "checked":
      return isChecked(currentValue);
    case "notChecked":
      return !isChecked(currentValue);
  }
}

export function isFieldVisible(
  field: LegalDocumentField,
  values: LegalDocumentValues,
): boolean {
  return evaluateFieldCondition(field.visibleWhen, values);
}

export function isFieldRequired(
  field: LegalDocumentField,
  values: LegalDocumentValues,
): boolean {
  return field.required || evaluateRequiredCondition(field, values);
}

function evaluateRequiredCondition(
  field: LegalDocumentField,
  values: LegalDocumentValues,
): boolean {
  if (!field.requiredWhen) return false;
  return evaluateFieldCondition(field.requiredWhen, values);
}

/** Whether the field takes a copied answer now (its `copyWhen` holds). */
export function isFieldCopied(
  field: LegalDocumentField,
  values: LegalDocumentValues,
): boolean {
  return field.copyWhen !== undefined
    ? evaluateFieldCondition(field.copyWhen.when, values)
    : false;
}

/**
 * The answers with each copied field set to its copy. A copy reads the
 * answers as given, so a copy of a copy is not followed.
 */
export function applyFieldCopies(
  metadata: Pick<LegalDocumentMetadata, "fields">,
  values: LegalDocumentValues,
): LegalDocumentValues {
  let copied: LegalDocumentValues | undefined;
  for (const field of metadata.fields) {
    const copy = field.copyWhen;
    if (!copy || !isFieldCopied(field, values)) continue;
    copied ??= { ...values };
    if (copy.value !== undefined) copied[field.key] = copy.value;
    else if (copy.from !== undefined)
      copied[field.key] = Object.hasOwn(values, copy.from)
        ? values[copy.from]!
        : "";
  }
  return copied ?? values;
}
