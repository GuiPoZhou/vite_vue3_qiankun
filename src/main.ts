import './public-path';
import { createApp } from "vue";
import App from "./App.vue";
import router from './router/index.js';
import store from './store/index.js';
import {renderWithQiankun,qiankunWindow} from 'vite-plugin-qiankun/dist/helper'
import useaddRoute from '@/utils/loadingRouter'
// import "~/styles/element/index.scss";

// import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";
import "uno.css";

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";
import app from "~/store/modules/app";
let instance = null;
// 定义一个接口来描述 props 的结构
declare global {
    interface Window {
        __POWERED_BY_QIANKUN__: any
        __INJECTED_PUBLIC_PATH_BY_QIANKUN__: any
    }
}

async function render(props = {}) {
    instance = createApp(App);
    const { container } = props as any
    await useaddRoute()
    console.log('路由',router.getRoutes())
    instance.use(router)
      instance.use(store);
    instance.config.globalProperties.$mainStore = props.store
    instance.mount(
        container ? container.querySelector('#subProject') : document.getElementById('subProject')
    )
    if (qiankunWindow.__POWERED_BY_QIANKUN__) {
        console.log('🤓子应用运行')
    }
}

// some code
renderWithQiankun({
    mount(props) {
        console.log('viteapp mount')
        render(props)
    },
    bootstrap() {
        console.log('bootstrap')
    },
    unmount(props) {
        console.log('vite被卸载了')
        instance.unmount()
        instance._container.innerHTML = ''
        instance = null
    }
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render({})
}
