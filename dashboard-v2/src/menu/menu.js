import { addDefaultAppMenus } from "o4s-ui/utils";

const menus = [
  {
    name: "BrandProtectionAndEWarranty",
    path: "/BrandProtectionAndEWarranty",
    label: "Brand Protection & E-Warranty",
    icon: "pi-book",
    //component: () => import("@/views/BrandProtectionAndEWarranty/index.vue"),

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
        //component: () => import("@/views/BrandProtectionAndEWarranty/eWarranty/index.vue"),
        children: [
          {
            name: "eWarrantyDashboard",
            path: "/eWarrantyDashboard",
            exact: true,
            visible: false,
            component: () => import("@/views/BrandProtectionAndEWarranty/eWarranty/eWarrantyDashboard/index.vue"),
          },
          {
            name: "eWarrantyForm",
            path: "/eWarrantyForm",
            exact: true,
            visible: false,
            component: () => import("@/views/BrandProtectionAndEWarranty/eWarranty/eWarrantyRequestForm/index.vue"),
          }
        ]
      }
    ],
  }
];

export default addDefaultAppMenus(menus);
