const { argv } = require('node:process')

function main() {
    // ensure that there is only one command line argument
    if (argv.length !== 3) {
        console.error('Error: exactly one argument is required')
        process.exit(1)
    }
    let baseURL = argv[2]
    // ensure that the argument is a valid URL
    try {
        new URL(baseURL)
    } catch {
        console.error('Error: invalid URL')
        process.exit(1)
    }
    console.log(`Crawling ${baseURL}...`)


}

main()
