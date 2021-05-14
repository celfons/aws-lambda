export const verifyParam = (requiredField: string[], body: any): string | null => {
  for (const field of requiredField) {
    if (!body[field]) {
      return field
    }
  }
  return null
}
