import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

import routes from "./routes"; // Import your routes configuration
import ItemList from "src/components/ItemList.vue";
import MainLayout from "layouts/MainLayout.vue";
import IndexPage from "pages/IndexPage.vue";
import HomePage from "pages/HomePage.vue";
import StorageFloor from "pages/StorageFloor.vue";
import CatalogPages from "pages/CatalogPages.vue";
import CatalogStorage from "pages/CatalogStorage.vue";
import FloorofpricePages from "pages/FloorofpricePages.vue";
import DocumentPages from "pages/DocumentPages.vue";
import StorageRowShelf from "pages/StorageRowShelf.vue";
import PricePages from "pages/PricePages.vue";
import StorageRoom from "pages/StorageRoom.vue";
import AccessPages from "pages/AccessPages.vue";
import UserListPages from "pages/UserListPages.vue";
import StorageWarehouse from "pages/StorageWarehouse.vue";
import LoginPage from "pages/LoginPage.vue";
import ErrorNotFound from "pages/ErrorNotFound.vue";
export default route(function ({ store }) {
  // Pass store if needed

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
