const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('normalizeURL', () => {
    expect(normalizeURL('https://www.example.com')).toBe('www.example.com')
    expect(normalizeURL('https://www.Example.com')).toBe('www.example.com')
    expect(normalizeURL('https://www.example.com/')).toBe('www.example.com')
    expect(normalizeURL('https://www.EXAmple.com/')).toBe('www.example.com')
    expect(normalizeURL('https://www.example.com/foo')).toBe('www.example.com/foo')
    expect(normalizeURL('https://www.example.com/foo/')).toBe('www.example.com/foo')
    expect(normalizeURL('https://www.example.com/foo/bar')).toBe('www.example.com/foo/bar')
})
