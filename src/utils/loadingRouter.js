import router from '../router/index'
import axios from "axios";
import { getToken } from '@/utils/auth'

export default async function useaddRoute() {
    let url = import.meta.MODE === "production" ? `/${import.meta.env.VITE_VUE_APP_MICRONAME}/profiles/router.json` : `//${window.location.hostname}:${import.meta.env.VITE_VUE_APP_MicroPort}/profiles/router.json`
    let res = await axios.get(url, { headers: { 'Authorization': getToken() } });
    let dynamicRoutes = addDynamicRoutes(res);
    dynamicRoutes.forEach(item => {
      router.addRoute(item) //可以单独添加路由格式: /自定义路 ,也可以添加子路由格式：/父路由path/子路由path
    })
}

function addDynamicRoutes(res) {
    const viewModules = import.meta.glob('@/views/**/*.vue');
  let info = res.data
  let routerlist = info.routerList
  let routes = []
  routerlist.forEach(v => {
      // 构建动态导入的模块路径
      const modulePath = `/src/views/${v.component}`;
      if (viewModules[modulePath]) {
          routes.push({
              path: info.routerPrefix + v.path,
              name: v.name,
              component: viewModules[modulePath], // 直接使用预先获取的模块
          });
      } else {
          console.warn(`Component not found: ${modulePath}`);
      }
  });
  return routes;
}
