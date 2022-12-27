export default {
    name: "BrandProtectionAndEWarranty",
    path: "/brand-protection-eWarranty",
    label: "Brand Protection",
    icon: "pi-book",
  
    children: [
      {
        name: "E-Warranty",
        label: "E-Warranty",
        path: "/eWarranty",
        exact: true,
        expandMenuIcon: false,
        children: [
          {
            name: "List",
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
            name: "Form",
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