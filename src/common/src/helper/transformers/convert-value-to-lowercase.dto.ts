export const ConvertValueToLowercase = ({ value }) => {
  if (typeof value === 'string') {
    return value.toLowerCase()
  }
  return value
}
