export default (value) => {
  const date = new Date(value).toLocaleDateString()
  return date
}
