const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import("pages/IndexPage.vue") },
      {
        path: "home",
        component: () => import("pages/HomePage.vue"),
        name: "Home",
      },
      {
        path: "/WarehouseSort",
        component: () => import("pages/WarehouseSort.vue"),
        name: "Warehouse.Sort",
        meta: {
          breadcrumb: [
            {
              text: "Kho lưu trữ",
              to: { name: "Warehouse.Sort" },
            },
            {
              text: "Sắp xếp hồ sơ",
              to: { name: "Warehouse.Sort" },
            },
          ],
        },
      },
      {
        path: "/CatalogPages",
        component: () => import("pages/CatalogPages.vue"),
      },
      {
        path: "/CatalogStorage",
        component: () => import("pages/CatalogStorage.vue"),
      },
      {
        path: "/FloorofpricePages",
        component: () => import("pages/FloorofpricePages.vue"),
        name: "FloorofpricePages",
      },
      {
        path: "/DocumentPages",
        component: () => import("pages/DocumentPages.vue"),
        name: "DocumentPages",
      },
      {
        path: "/ShelfPages",
        component: () => import("pages/ShelfPages.vue"),
        name: "ShelfPages",
      },
      {
        path: "/PricePages",
        component: () => import("pages/PricePages.vue"),
        name: "PricePages",
      },

      {
        path: "/FloorPages",
        component: () => import("pages/FloorPages.vue"),
        name: "FloorPages",
      },
      {
        path: "/AccessPages",
        component: () => import("pages/AccessPages.vue"),
        name: "AccessPages",
      },
      {
        path: "/UserListPages",
        component: () => import("pages/UserListPages.vue"),
        name: "UserListPages",
      },
      {
        path: "/WarehousePages",
        component: () => import("pages/WarehousePages.vue"),
        name: "Warehouse.search",
        meta: {
          auth: true,
          breadcrumb: [
            {
              text: "Kho lưu trữ",
              to: { name: "Warehouse.search" },
            },
            {
              text: "Tra cứu",
              to: { name: "Warehouse.search" },
            },
          ],
        },
      },
    ],
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("pages/LoginPage.vue"), // Lazy load
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("pages/DashboardLogin.vue"), // Lazy load
    meta: { requiresAuth: true },
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
