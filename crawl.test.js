const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLSFromHTML } = require('./crawl.js')

describe('normalizeURL Function', () => {
    test('removes https protocol', () => {
      const input = 'https://www.example.com'
      const expected = 'www.example.com'
      expect(normalizeURL(input)).toEqual(expected)
    })

    test('removes http protocol', () => {
      const input = 'http://www.example.com'
      const expected = 'www.example.com'
      expect(normalizeURL(input)).toEqual(expected)
    })

    test('handles mixed case domain', () => {
      const input = 'https://www.ExaMple.COM'
      const expected = 'www.example.com'
      expect(normalizeURL(input)).toEqual(expected)
    })

    test('retains path in the URL', () => {
      const input = 'https://www.example.com/path/to/resource'
      const expected = 'www.example.com/path/to/resource'
      expect(normalizeURL(input)).toEqual(expected)
    })

    test('removes trailing slash', () => {
      const input = 'https://www.example.com/'
      const expected = 'www.example.com'
      expect(normalizeURL(input)).toEqual(expected)
    })
  })

describe('getURLsFromHTML Function', () => {
    test('extracts URLs from simple HTML string', () => {
      const htmlBody = '<a href="https://www.example.com">Example</a>';
      const baseURL = 'https://www.test.com';
      const expected = ['https://www.example.com'];
      expect(getURLSFromHTML(htmlBody, baseURL)).toEqual(expected);
    });

    test('handles relative URLs by appending baseURL', () => {
      const htmlBody = '<a href="/path/to/resource">Resource</a>';
      const baseURL = 'https://www.test.com';
      const expected = ['https://www.test.com/path/to/resource'];
      expect(getURLSFromHTML(htmlBody, baseURL)).toEqual(expected);
    });

    test('returns an empty array for HTML with no links', () => {
      const htmlBody = '<p>No links here</p>';
      const baseURL = 'https://www.test.com';
      const expected = [];
      expect(getURLSFromHTML(htmlBody, baseURL)).toEqual(expected);
    });

    test('extracts multiple URLs from HTML', () => {
      const htmlBody = '<a href="https://www.example.com">Example</a><a href="https://www.test.com/page">Test</a>';
      const baseURL = 'https://www.test.com';
      const expected = ['https://www.example.com', 'https://www.test.com/page'];
      expect(getURLSFromHTML(htmlBody, baseURL)).toEqual(expected);
    });

  });
