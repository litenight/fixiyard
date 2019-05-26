module.exports = {
  globDirectory: 'static/',
  globPatterns: ['**/*.{css,ico,html,png,js,json,woff2}'],
  swDest: './static/js/sw.js',
  skipWaiting: true,
  clientsClaim: true,
  templatedURLs: {
    '/hoodie/client.js': '.hoodie/client.js'
  }
}
