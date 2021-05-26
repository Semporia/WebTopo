
// Configuration for your app
const path = require('path')
function rootPath (dir) {
  return path.join(__dirname, '.', dir)
}

const APP_INFO = {
  NAME: 'wode',
  PKG_NAME: 'wode'
}

module.exports = function (ctx) {
  return {
    boot: [
      // references /src/boot/<name>.js
      'i18n',
      'axios',
      'x2js',
      'EventBus',
      'config'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      'material-icons', // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
      'roboto-font' // optional, you are not bound to it
    ],
    supportIE: true,
    build: {
      env: {
        APP_NAME: JSON.stringify(APP_INFO.NAME),
        PKG_NAME: JSON.stringify(APP_INFO.PKG_NAME)
      },
      scopeHoisting: true,
      vueRouterMode: 'history',
      publicPath: '/webtopo',
      // publicPath: '/', // 注意：这里请根据实际情况部署
      vueCompiler: true,
      gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          '@': rootPath('src')
        }
      }
    },
    devServer: {
      // https: true,
      port: 9090,
      open: true, // opens browser window automatically
      proxy: {
        // 设置代理
        '/api': {
          // 8000 是后端地址端口，local运行时前端使用8001，后端使用8000 端口
          target: 'http://localhost', // 接口域名
          changeOrigin: true, // 是否跨域
          autoOpenBrowser: true,
          assetsSubDirectory: 'static',
          assetsPublicPath: '/',
          pathRewrite: {
            '^/api': '/api' // 需要api
          }
          // ,
          // '/socket/**': {
          //   target: 'wss://localhost',
          //   ws: true,
          //   secure: false,
          //   logLevel: 'debug'
          // }
        }
      }
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QExpansionItem',
        'QSelect',
        'QInput',
        'QColor',
        'QSlider',
        'QPopupProxy',
        'QForm',
        'QBadge',
        'QDialog',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QTable',
        'QTh',
        'QTr',
        'QTd',
        'QAvatar',
        'QFooter',
        'QScrollArea',
        'QSeparator',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QImg',
        'QPagination',
        'QUploader',
        'QChip',
        'QSpace',
        'QField',
        'QDate',
        'QTime'
      ],
      directives: [
        'Ripple',
        'ClosePopup'
      ],
      // Quasar plugins
      plugins: [
        'Notify'
      ]
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
