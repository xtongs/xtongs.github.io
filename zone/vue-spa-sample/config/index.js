// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var fs = require('fs')
var port = 8000

function getTarget() {
  var api = {}
  try {
    delete require.cache[require.resolve(path.resolve(__dirname, '../api.js'))]
    api = require(path.resolve(__dirname, '../api.js'))
  } catch (e) {}
  return 'http://' + (api.host || 'www.host.co')
}

function getJsonFilePath(req) {
  return path.resolve(__dirname, '../static/mock/' + req.method.toLowerCase() + req.url.split('?')[0] + '.json')
}

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: port,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/': {
        filter: (n, req) => !(n.match('^/(index.html|__webpack)') || n === '/' || n.indexOf('.js') > -1 || n.indexOf('static') > -1),
        target: getTarget(),
        router: (req) => {
          // overwrite request host
          try {
            // 清除mock数据的缓存
            delete require.cache[require.resolve(getJsonFilePath(req))]
            fs.accessSync(getJsonFilePath(req), fs.F_OK)
          } catch (e) {
            return getTarget()
          }
          return 'http://127.0.0.1:' + port
        },
        pathRewrite: (pathname, req) => {
          // overwrite request path
          try {
            // 清除mock数据的缓存
            delete require.cache[require.resolve(getJsonFilePath(req))]
            fs.accessSync(getJsonFilePath(req), fs.F_OK)
          } catch (e) {
            return pathname
          }
          return '/static/mock/' + req.method.toLowerCase() + req.url.split('?')[0] + '.json'
        },
        logLevel: 'warn',
        changeOrigin: true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
