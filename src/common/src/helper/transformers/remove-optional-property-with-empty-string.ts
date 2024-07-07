export const RemoveOptionalPropertyWithEmptyString = ({ value }) => {
  if (value === '') {
    return undefined
  }
  return value
}
