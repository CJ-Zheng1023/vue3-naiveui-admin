import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import Compression from 'vite-plugin-compression'
import svgLoader from 'vite-svg-loader'
import path from 'path'
const resolve = (dir: string): string => path.resolve(__dirname, dir)
const version = process.env.npm_package_version
const assetsDir = 'assets'
// https://vitejs.dev/config/
export default defineConfig(config => {
  return {
    resolve: {
      alias: {
        '@': resolve('src'),
        '#': resolve('mock')
      }
    },
    plugins: [
      config.mode === 'report' ? visualizer({ open: false, brotliSize: true, gzipSize: true, filename: './report/index.html' }) : null,
      vue(),
      svgLoader(),
      vueJsx(),
      Compression({
        threshold: 1024 * 10 //单位为byte，大于这个阈值进行压缩
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'vue-i18n'],
        vueTemplate: true
      }),
      Components({
        resolvers: [NaiveUiResolver(), IconsResolver()]
      }),
      Icons({
        autoInstall: true
      }),
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [path.resolve(__dirname, 'locales/**')]
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/styles/global.less";'
        }
      }
    },
    esbuild: {
      drop: config.mode === 'production' ? ['console', 'debugger'] : []
    },
    build: {
      minify: 'esbuild', // 默认值
      assetsDir,
      rollupOptions: {
        output: {
          entryFileNames: `${assetsDir}/[name].[hash]-${version}.js`,
          chunkFileNames: `${assetsDir}/[name].[hash]-${version}.js`,
          assetFileNames: `${assetsDir}/[name].[hash]-${version}.[ext]`
        }
      }
      /* rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }, */
      /* terserOptions: {
        // 生产环境下移除console
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      } */
    },
    server: {
      port: 7788,
      open: true,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://rap2api.taobao.org/app/mock/317413',
          // target: 'http://10.13.37.80:8085',
          // target: 'http://10.13.49.195:8083',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        '/micia': {
          target: 'http://10.13.49.195:8080'
        },
        '/neuview': {
          target: 'http://10.13.49.194:8888'
        },
        '/doc': {
          target: 'http://10.13.49.194:84'
        }
      }
    }
  }
})
