export const ERROR_MESSAGE_BUILDERS = {
  resourceNotFound: (resourceName: string): string =>
    `${resourceName} not found`,
  resourceAlreadyExists: (resourceName: string): string =>
    `${resourceName} already exists`,
  fieldRequired: (fieldName: string): string => `${fieldName} is required`,
  fieldTooShort: (fieldName: string, minLength: number): string =>
    `${fieldName} must be at least ${minLength} characters long`,
  fieldTooLong: (fieldName: string, maxLength: number): string =>
    `${fieldName} cannot exceed ${maxLength} characters`,
  invalidFieldValue: (fieldName: string): string =>
    `Invalid ${fieldName} value`,
  resourceWithIdNotFound: (resourceName: string, id: string): string =>
    `${resourceName} with id ${id} not found`,
  duplicateField: (fieldName: string): string => `${fieldName} already exists`,
};
