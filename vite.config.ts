import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import postcsspxtoviewport from 'postcss-px-to-viewport'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

function resolve(dir: string) {
  return path.join(__dirname, dir)
}

export default defineConfig(({ mode }) => {
  // vite 中获取环境变量
  const isProduct = mode === 'production'
  const baseUrl = loadEnv(mode, process.cwd()).VITE_APP_BASE_URL
  return {
    base: baseUrl,
    server: {
      host: '0.0.0.0',
      port: 8888,
      open: false,
      https: false,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:4523/m1/3695511-0-default/',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
    esbuild: {
      drop: isProduct ? ['console', 'debugger'] : [],
    },
    build: {
      minify: 'esbuild',
      target: 'es6',
      chunkSizeWarningLimit: 500,
      assetsInlineLimit: 1024 * 6,
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router'],
          },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
        },
      },
    },
    resolve: {
      // 配置别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@use': path.resolve(__dirname, 'src/use'),
        '@components': path.resolve(__dirname, 'src/components'),
      },
    },
    css: {
      // 配置引入全局变量
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/var.scss";',
        },
      },
      postcss: {
        plugins: [
          // px => vw
          postcsspxtoviewport({
            unitToConvert: 'px',
            viewportWidth: 750, // 视窗的宽度, 根据设计稿的尺寸
            unitPrecision: 3, //指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
            propList: ['*'],
            exclude: [/node_modules/],
            selectorBlackList: ['ignore_'], //指定不转换为视窗单位的类,
          }),
        ],
      },
    },
    plugins: [
      vue(),
      /* 开启mock配置 */
      viteMockServe({
        // localEnabled: true, // 此处可以手动设置为true，也可以根据官方文档格式
        mockPath: './src/mock/',
        logger: true,
      }),
      Components({
        resolvers: [VantResolver()],
      }),
      AutoImport({
        dts: true, // 会在根目录生成auto-imports.d.ts，里面可以看到自动导入的api
        imports: ['vue', 'vue-router', 'pinia'],
        // eslintrc: {
        // 	enabled: false,
        // 	filepath: './.eslintrc-auto-import.json',
        // 	globalsPropValue: true,
        // },
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve('./src/assets/svgs')],
        // 指定symbolId格式
        symbolId: '[name]',
      }),
    ],
    // optimizeDeps: {
    // 为一个字符串数组
    // include: ['lodash-es'],
    // },
  }
})
