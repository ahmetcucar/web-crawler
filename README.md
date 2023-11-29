# web-crawler

This project is a web crawler built with JavaScript and NodeJS. It's designed to crawl websites, starting from a base URL, and recursively follow links to other pages within the same path as the base URL. The main functionalities include handling relative URLs, normalizing URLs, and avoiding redundant crawls of the same page. After finishing the crawl, it outputs a report of every page it has visited and the amount of visits per page.

## Features
- Crawls a website from a given base URL.
- Normalizes URLs to ensure consistency.
- Handles both absolute and relative URLs.
- Checks and avoids crawling the same page multiple times.

## Motivation
The primary motivations behind creating this web crawler project were:

- Gain Experience with JavaScript and Node.js: To deepen my understanding and skills in JavaScript, particularly in a Node.js environment. This project provided a hands-on opportunity to work with asynchronous programming patterns, handle HTTP requests, and process data in JavaScript.

- Understanding HTTP and Web Networking: To gain practical experience with web networking concepts, including making HTTP requests, handling responses, and understanding web protocols and content types. This project served as a real-world application to explore how web networking operates and how data is transferred and processed over the Internet.

These motivations guided the project's development, leading to a focus on robust error handling, efficient data processing, and a deeper exploration of web technologies.

## Installation

Before installing the web crawler, ensure the following prerequisites are met:

1. **Node Version Manager (NVM)**: NVM must be installed on your machine. It allows you to switch between different Node.js versions easily. You can find installation instructions for NVM [here](https://github.com/nvm-sh/nvm#installing-and-updating).

2. **Using the Correct Node.js Version**:
   After cloning the repository, navigate to the project directory and run `nvm use`. This command will automatically switch to the Node.js version specified in the `.nvmrc` file, ensuring compatibility with the project's requirements.

3. **Installing Dependencies**:
   Run `npm install` to install the necessary dependencies for the project. This command reads the `package.json` file and installs all the libraries and packages listed under dependencies.

## Usage
Running the web crawler is simple. After installing the project as described in the Installation section, you can start crawling a website by using the following command:
```
npm start [baseURL]
```
Replace [baseURL] with the URL of the website you wish to crawl. For example, to crawl https://youtube.com, you would run:
```
npm start https://youtube.com
```

and here is what the console output looks like:

<img width="619" alt="image" src="https://github.com/ahmetcucar/web-crawler/assets/103691809/291cb81d-e310-4bb7-8dcc-389bddb75fb9">


## Misc Notes
- you might have to run `nvm use` every time you open up a new terminal before running the web crawler in order for it to use the correct node version.

Thanks!
