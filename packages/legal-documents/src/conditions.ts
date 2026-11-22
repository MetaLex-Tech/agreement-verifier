import type {
  FieldCondition,
  LegalDocumentField,
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

  const currentValue = normalizeConditionValue(values[condition.field]);
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
