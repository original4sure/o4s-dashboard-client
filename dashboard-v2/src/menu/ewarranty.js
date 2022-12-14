export default {
  name: "BrandProtectionAndEWarranty",
  path: "/brand-protection-eWarranty",
  label: "Brand Protection",
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
      name: "BrandProtectionAndEWarranty-eWarranty",
      label: "E-Warranty",
      path: "/eWarranty",
      exact: true,
      expandMenuIcon: false,
      //component: () => import("@/views/brand-protection-eWarranty/eWarranty/index.vue"),
      children: [
        {
          name: "BrandProtectionAndEWarranty-eWarranty-list",
          label: "List",
          path: "/list",
          exact: true,
          visible: false,
          component: () =>
            import(
              "@/views/brand-protection-eWarranty/eWarranty/list/index.vue"
            ),
        },
        {
          name: "BrandProtectionAndEWarranty-eWarranty-form",
          label: "Form",
          path: "/form/:warrantyCode",
          exact: true,
          visible: false,
          component: () =>
            import(
              "@/views/brand-protection-eWarranty/eWarranty/form/index.vue"
            ),
        },
      ],
    },
  ],
  meta: {
    requiresAuth: true,
  },
};
