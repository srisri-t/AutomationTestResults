// vue.config.js for GitHub Pages deployment with performance optimizations
const path = require('path');

module.exports = {
  publicPath: '/TestResults/',
  lintOnSave: false,
  devServer: {
    port: 8080,
    open: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          vuetify: {
            test: /[\\/]node_modules[\\/]vuetify[\\/]/,
            name: 'vuetify',
            chunks: 'all',
          },
        },
      },
    },
  },
  chainWebpack: config => {
    // Enable gzip compression
    config.plugin('CompressionPlugin').use(require('compression-webpack-plugin'), [{
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    }]);

    // Optimize images
    config.module
      .rule('images')
      .test(/\.(gif|png|jpe?g|svg)$/i)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: { progressive: true, quality: 85 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.90], speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 85 }
      });

    // Ensure proper asset copying
    config.plugin('copy').tap(([options]) => {
      if (!options.patterns) {
        options.patterns = [];
      }
      
      // Copy favicon files
      options.patterns.push({
        from: path.resolve(__dirname, 'public/img'),
        to: path.resolve(__dirname, 'dist/img'),
        globOptions: {
          ignore: ['**/.*']
        }
      });
      
      // Copy TestResultsJsons directory
      options.patterns.push({
        from: path.resolve(__dirname, 'public/TestResultsJsons'),
        to: path.resolve(__dirname, 'dist/TestResultsJsons'),
        globOptions: {
          ignore: ['**/.*']
        }
      });
      
      return [options];
    });

    // Configure proper chunk naming for consistent asset paths
    config.output.filename('[name].[contenthash:8].js');
    config.output.chunkFilename('[name].[contenthash:8].js');

    // Tree shaking for Vuetify (only if plugin exists)
    if (config.plugins.has('VuetifyLoaderPlugin')) {
      config.plugin('VuetifyLoaderPlugin').tap(args => {
        args[0].theme = {
          themes: {
            light: {
              primary: '#3B82F6',
              secondary: '#64748B',
            },
            dark: {
              primary: '#60A5FA',
              secondary: '#94A3B8',
            }
          }
        };
        return args;
      });
    }
  },
  // PWA for caching
  pwa: {
    name: 'Cucumber Report Viewer',
    short_name: 'Cucumber Reports',
    description: 'View and analyze Cucumber test reports with an interactive web interface',
    themeColor: '#3B82F6',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      name: 'Cucumber Report Viewer',
      short_name: 'Cucumber Reports',
      description: 'View and analyze Cucumber test reports with an interactive web interface',
      start_url: '/TestResults/',
      scope: '/TestResults/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#3B82F6',
      icons: [
        {
          src: '/TestResults/img/icons/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png'
        },
        {
          src: '/TestResults/img/icons/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png'
        },
        {
          src: '/TestResults/img/icons/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png'
        }
      ]
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/favicon.svg',
      msTileImage: 'img/icons/favicon-32x32.png'
    },
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-stylesheets',
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-webfonts',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
          },
        },
        {
          urlPattern: /\/TestResults\/TestResultsJsons\/.*/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'cucumber-reports',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
            },
          },
        }
      ]
    }
  }
};