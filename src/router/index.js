import { createRouter, createWebHistory } from "vue-router";

const routes = [];
const router = createRouter({
  // history: createWebHistory(import.meta.env.NODE === "production" ? `/${import.meta.env.VITE_VUE_APP_MICRONAME}/` : `/${import.meta.env.VITE_VUE_APP_MICRO_ACTIVERULE}`,),
  history: createWebHistory(),
  routes,
});

export default router;
