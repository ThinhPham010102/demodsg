const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },

  {
    path: "/Catalog/:type",
    component: () => import("src/pages/CatalogPages.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/Warehouse",
    component: () => import("pages/Warehouse.vue"),
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
];

export default routes;
