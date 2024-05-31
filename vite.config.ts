import path from 'path'
import os from 'os'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Unocss from 'unocss/vite'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import qiankun from 'vite-plugin-qiankun'

function resolve(dir) {
  return path.join(__dirname, dir)
}
function getNetworkIp() {
  let needHost = ''; // 打开的host
  try {
    // 获得网络接口列表
    let network = os.networkInterfaces();
    for (let dev in network) {
      let iface = network[dev];
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          needHost = alias.address;
        }
      }
    }
  } catch (e) {
    needHost = 'localhost';
  }
  return needHost;
}
// let devPublicPath = `//${getNetworkIp()}:${process.env.VUE_APP_MicroPort}`
// let proPublicPath = `/${process.env.VUE_APP_MICRONAME}/`
const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  base: 'http://localhost:7004',
  server: {
    host: '0.0.0.0',
    port: 7004,
    cors: true,
    origin: 'http://localhost:7004',
  },
  resolve: {
    alias: {
      '~/': `${pathSrc}/`,
      '@/': path.resolve(__dirname, 'src') + '/'
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
      },
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    // 设置 target 为 esnext 或 es2015 以启用 ESM
    target: 'esnext',
  },
  plugins: [
    vue(),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
      transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
      ]
    }),
      qiankun("subProject",{
        useDevMode: true
      })
  ],
})
