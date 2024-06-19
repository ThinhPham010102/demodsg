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
    path: "/CatalogPages/list",
    component: () => import("pages/CatalogPages.vue"),
    meta: {
      requiresAuth: true,
    },
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
];

export default routes;
