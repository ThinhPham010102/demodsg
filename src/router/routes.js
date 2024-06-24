const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      requireAuth: true,
    },
    children: [
      { path: "/", component: () => import("pages/IndexPage.vue") },
      {
        path: "home",
        component: () => import("pages/HomePage.vue"),
        name: "Home",
        meta: { requiresAuth: true },
      },
      {
        path: "/StorageFloor",
        component: () => import("pages/StorageFloor.vue"),
        name: "StorageFloor",
        meta: { requiresAuth: true },
      },
      {
        path: "/CatalogPages",
        component: () => import("pages/CatalogPages.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/CatalogStorage",
        component: () => import("pages/CatalogStorage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/FloorofpricePages",
        component: () => import("pages/FloorofpricePages.vue"),
        name: "FloorofpricePages",
        meta: { requiresAuth: true },
      },
      {
        path: "/DocumentPages",
        component: () => import("pages/DocumentPages.vue"),
        name: "DocumentPages",
      },
      {
        path: "/StorageRowShelf",
        component: () => import("pages/StorageRowShelf.vue"),
        name: "StorageRowShelf",
      },
      {
        path: "/PricePages",
        component: () => import("pages/PricePages.vue"),
        name: "PricePages",
      },

      {
        path: "/StorageRoom",
        component: () => import("pages/StorageRoom.vue"),
        name: "StorageRoom",
      },
      {
        path: "/AccessPages",
        component: () => import("pages/AccessPages.vue"),
        name: "AccessPages",
      },

      {
        path: "/StorageWarehouse",
        component: () => import("pages/StorageWarehouse.vue"),
        name: "Warehouse.StorageWarehouse",
      },
    ],
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("pages/LoginPage.vue"), // Lazy load
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/Itemlist",
    component: () => import("src/pages/ItemList.vue"),
  },
];

export default routes;
