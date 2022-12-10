export default {
  name: "BrandProtectionAndEWarranty",
  path: "/brand-protection-eWarranty",
  label: "Brand Protection & E-Warranty",
  icon: "pi-book",
  //component: () => import("@/views/brand-protection-eWarranty/index.vue"),

  children: [
    // {
    //   name: "consumerScans",
    //   path: "/consumerScans",
    //   exact: true,
    //   icon: "pi-circle",
    // },
    {
      name: "eWarranty",
      path: "/eWarranty",
      exact: true,
      //component: () => import("@/views/brand-protection-eWarranty/eWarranty/index.vue"),
      children: [
        {
          name: "list",
          path: "/list",
          exact: true,
          visible: false,
          component: () => import("@/views/brand-protection-eWarranty/eWarranty/list/index.vue"),
        },
        {
          name: "form",
          path: "/form/:warrantyCode",
          exact: true,
          visible: false,
          component: () => import("@/views/brand-protection-eWarranty/eWarranty/form/index.vue"),
        },
      ],
    },
  ],
};
