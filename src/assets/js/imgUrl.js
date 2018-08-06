import config from './config'

export default (value) => {
    const url = config.server+'/' + value
    return url
}