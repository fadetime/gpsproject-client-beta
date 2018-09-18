export default (value) => {
    const date = new Date(value).toLocaleTimeString()
    return date
}