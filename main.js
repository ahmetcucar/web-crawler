const { argv } = require('node:process')
const { crawlPage, printReport } = require('./crawl.js')

async function main() {
    // ensure that there is only one command line argument
    if (argv.length !== 3) {
        console.error('Error: exactly one argument is required')
        process.exit(1)
    }
    let baseURL = argv[2]
    // remove trailing slashes
    baseURL = baseURL.replace(/\/+$/, "");
    // ensure that the argument is a valid URL
    try {
        new URL(baseURL)
    } catch {
        console.error('Error: invalid URL')
        process.exit(1)
    }
    console.log()
    // crawl the page and print the report
    let pages = {}
    pages = await crawlPage(baseURL, baseURL, pages)
    printReport(pages)
}

main()
