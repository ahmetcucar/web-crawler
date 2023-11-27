const { JSDOM } = require('jsdom')

// normalizeURL
// It takes a URL as input and returns a normalized URL.
// Normalized URLs have the following properties:
// - The protocol is removed (http:// or https://)
// - The domain is lowercased
// - The path is preserved
// - The trailing slash is removed
// - The URL is returned as a string
function normalizeURL(url) {
    const urlObj = new URL(url)
    const hostPath = urlObj.host + urlObj.pathname
    if (hostPath.endsWith('/')) {
        return hostPath.slice(0, -1)
    }
    return hostPath

}

// getURLSFromHTML
// It takes a string of HTML as input and returns a list of all the link URLs.
// We'll use the JSDOM library to parse the HTML and extract the links.
// baseURL = the root URL of the website we're crawling.
// This will allow us to rewrite relative URLs into absolute URLs.
function getURLSFromHTML(htmlBody, baseURL) {
    urls = []
    const dom = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll('a')
    links.forEach(link => {
        const href = link.getAttribute('href')
        if (href.startsWith('http')) {
            urls.push(href)
        } else {
            urls.push(baseURL + href)
        }
    })
    return urls
}


async function crawlPage(baseURL, url, pages) {
    try {
        const response = await fetch(baseURL)
        // Check for fetch errors
        if (response.status >= 400) {
            throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
        }
        // Check if content type is HTML
        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            throw new Error(`${url} is not HTML`)
        }
        // Process HTML body
        const htmlBody = await response.text()
        console.log(htmlBody)

        return pages
    } catch (error) {
        console.error(`Error: ${error.message}`)
        return pages
    }
}


module.exports = {
    normalizeURL,
    getURLSFromHTML,
    crawlPage
}
