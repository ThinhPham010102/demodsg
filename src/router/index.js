import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

import routes from "./routes"; // Import your routes configuration
import ItemList from "src/components/ItemList.vue";

export default route(function ({ store }) {
  // Pass store if needed
  routes: [
    {
      path: "/",
      name: "ItemList",
      component: ItemList,
    },
  ];
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Middleware to check authentication
  Router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (store.getters.isAuthenticated) {
        // Make sure store is passed in the route function
        next();
      } else {
        next("/login");
      }
    } else {
      next();
    }
  });

  return Router;
});
