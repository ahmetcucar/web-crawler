function normalizeURL(url) {
    const urlObj = new URL(url)
    const hostPath = urlObj.host + urlObj.pathname
    if (hostPath.endsWith('/')) {
        return hostPath.slice(0, -1)
    }
    return hostPath

}


module.exports = {
    normalizeURL
}
