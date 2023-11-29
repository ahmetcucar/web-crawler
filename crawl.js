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


async function crawlPage(baseURL, currURL, pages) {
    // ensure that currURL is in same domain as baseURL
    if (new URL(currURL).host !== new URL(baseURL).host) {
        return pages
    }
    const normalizedURL = normalizeURL(currURL)
    // check if we've already crawled this page
    if (pages[normalizedURL]) {
        pages[normalizedURL].count++
        return pages
    }
    // fetch the page
    try {
        console.log(`Crawling ${currURL}...`)
        const response = await fetch(currURL)

        // check for HTTP errors
        if (response.status >= 400) {
            throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
        }
        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            throw new Error(`${currURL} is not HTML`)
        }

        // add page to pages object
        if (normalizedURL === normalizeURL(baseURL)) {
            pages[normalizedURL] = { count:0 }
        } else {
            pages[normalizedURL] = { count:1 }
        }

        // Process HTML body and extract links
        const htmlBody = await response.text()
        const urls = getURLSFromHTML(htmlBody, baseURL)

        // crawl each URL
        for (const url of urls) {
            await crawlPage(baseURL, url, pages)
        }

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
