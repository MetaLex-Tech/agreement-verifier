import { evaluateFieldCondition } from "./conditions";
import type { FieldCondition, LegalDocumentField } from "./schema";

/**
 * One registered value of an agreement edition. This declaration is the only
 * source for the name in the registry schema, the question to the signer, the
 * rule that sets the value when the signer gets no question and the check on
 * the answer. The readable agreement gets its words from the reference nodes
 * of the edition's annotation, not from this declaration.
 */
export type AgreementField = {
  /** Identifies the field in a condition or a copy rule. */
  key: string;
  /** Exact name in the registered schema. The template ID includes it. */
  registered: string;
  question: {
    label: string;
    helpText?: string;
    placeholder?: string;
    /** The only permitted answers. `note` tells the signer what the answer
     * sets. */
    options?: readonly { value: string; label: string; note?: string }[];
    /** Common answers that the form offers. The signer can type another. */
    suggestions?: readonly string[];
  };
  /** Ask the question only when this condition is true. */
  askWhen?: FieldCondition;
  /** Sets the value when the question is not asked. */
  otherwise?: { copy: string } | { value: string };
  check: { required: boolean; maxLength?: number; refusal?: string };
};

type Entered = { readonly [index: number]: string | undefined };

/** Refuses a declaration that the form cannot apply. */
export function assertAgreementFields<
  const T extends readonly AgreementField[],
>(fields: T): T {
  const invalid = (reason: string) =>
    new Error(`The agreement field declaration is invalid: ${reason}.`);
  const keys = fields.map((field) => field.key);
  const asked = (key: string) =>
    fields.some((field) => field.key === key && !field.askWhen);
  if (new Set(keys).size !== keys.length) throw invalid("a key repeats");
  if (
    new Set(fields.map((field) => field.registered)).size !== fields.length ||
    fields.some((field) => !field.registered)
  )
    throw invalid("a registered name is empty or repeats");
  for (const field of fields) {
    if (!/^[A-Za-z][A-Za-z0-9]*$/.test(field.key))
      throw invalid(`the key ${field.key} is not permitted`);
    if (!field.askWhen !== !field.otherwise)
      throw invalid(
        `${field.key} needs a condition and a rule for the value together`,
      );
    // The condition and the copied value must come from an answer.
    if (field.askWhen && !asked(field.askWhen.field))
      throw invalid(`the condition of ${field.key} has no answer to read`);
    if (
      field.otherwise &&
      "copy" in field.otherwise &&
      !asked(field.otherwise.copy)
    )
      throw invalid(`${field.key} copies a value that has no answer`);
    const values = field.question.options?.map((option) => option.value);
    if (values && (!values.length || new Set(values).size !== values.length))
      throw invalid(`the answers of ${field.key} are empty or repeat`);
  }
  return fields;
}

/** The ordered names that the registry schema stores. */
export function registeredFieldNames(fields: readonly AgreementField[]) {
  return fields.map((field) => field.registered);
}

function enteredByKey(fields: readonly AgreementField[], entered: Entered) {
  return Object.fromEntries(
    fields.map((field, index) => [field.key, entered[index]?.trim() ?? ""]),
  );
}

/** A question in the form schema of the document composer, with the position
 * of its value in the registered order. */
export type SignerQuestion = LegalDocumentField & {
  index: number;
  note?: string;
  suggestions?: readonly string[];
};

/**
 * The questions for the values the signer must supply now. A field that has
 * a rule for its value and a false condition gets no question.
 */
export function signerQuestions(
  fields: readonly AgreementField[],
  entered: Entered,
): SignerQuestion[] {
  const values = enteredByKey(fields, entered);
  return fields.flatMap((field, index) => {
    if (!evaluateFieldCondition(field.askWhen, values)) return [];
    const options = field.question.options;
    return [
      {
        index,
        key: field.key,
        scope: "party",
        collectionStage: "signing",
        label: field.question.label,
        type: options ? "select" : "string",
        required: field.check.required,
        editable: true,
        ...(field.question.helpText && { helpText: field.question.helpText }),
        ...(field.question.placeholder && {
          placeholder: field.question.placeholder,
        }),
        ...(field.askWhen && { visibleWhen: field.askWhen }),
        ...(options && {
          options: options.map(({ label, value }) => ({ label, value })),
        }),
        ...(field.check.maxLength && {
          validation: { maxLength: field.check.maxLength },
        }),
        ...(field.question.suggestions && {
          suggestions: field.question.suggestions,
        }),
        note: options?.find((option) => option.value === values[field.key])
          ?.note,
      },
    ];
  });
}

/**
 * The values in registered order, as the wallet request carries them. An
 * answer loses its outer spaces. A field with no question gets its value from
 * its rule. With `check`, an answer outside the permitted answers is refused.
 */
export function signerValues(
  fields: readonly AgreementField[],
  entered: Entered,
  { check = false }: { check?: boolean } = {},
) {
  const values = enteredByKey(fields, entered);
  if (check)
    for (const field of fields) {
      if (field.askWhen && !evaluateFieldCondition(field.askWhen, values))
        continue;
      const { maxLength } = field.check;
      if (maxLength && values[field.key]!.length > maxLength)
        throw new Error(
          `${field.question.label} must have ${maxLength} characters or fewer.`,
        );
      const options = field.question.options;
      if (options && !options.some((o) => o.value === values[field.key]))
        throw new Error(
          field.check.refusal ??
            `${field.question.label} must use one of the available options.`,
        );
    }
  return fields.map((field) => {
    const rule = field.otherwise;
    if (!rule || evaluateFieldCondition(field.askWhen, values))
      return values[field.key]!;
    return "copy" in rule ? values[rule.copy]! : rule.value;
  });
}
