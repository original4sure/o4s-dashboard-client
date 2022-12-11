import { addDefaultAppMenus } from "o4s-ui/utils";

const menus = [
  {
    name: "App",
    path: "/",
    exact: true,
    icon: "pi-check",
    expand: true,
    label: "Application",
    children: [
      {
        name: "components",
        path: "/components",

        icon: "pi-file",
        // component: () => import("@/views/generic-component/Index.vue"),

        children: [
          {
            name: "button",
            path: "/button",

            exact: true,
            icon: "pi-car",
            component: () => import("@/views/generic-component/Index.vue"),
          },
          {
            name: "Others",
            path: "/others",
            exact: true,

            // component: () => import("@/views/generic-component/Index.vue"),
            // component: () => import("@/views/text/TextDemo.vue"),
            children: [
              {
                name: "buttonprimary",
                path: "/primary",
                exact: true,
                icon: "pi-car",
                component: () => import("@/views/generic-component/Index.vue"),
                children: [
                  {
                    name: "deep",
                    path: "/deep1",
                    exact: true,
                    icon: "pi-amazon",
                    component: () =>
                      import("@/views/generic-component/Index.vue"),
                  },
                  {
                    name: "added new page",
                    path: "/newpage",
                    exact: true,
                    icon: "pi-spinner",
                    component: () =>
                      import("@/views/generic-component/Index.vue"),
                  },
                ],
              },
              {
                name: "buttonsecondary",
                path: "/secondary",
                exact: true,
                icon: "pi-car",
                component: () => import("@/views/generic-component/Index.vue"),
              },
              // {
              //   name: "buttonplain",
              //   path: "/plain",
              //   exact: true,
              //   icon: "pi-file",
              //   component: () => import("@/views/generic-component/Index.vue"),
              // },
            ],
          },
        ],
      },
      {
        name: "InputText",
        path: "/o4s-labeled-input-text",
        component: () => import("@/views/generic-component/Index.vue"),
      },
      {
        name: "Dropdown",
        // path: "https://dev-dashboard.o4s.io/login",
        url: "https://dev-dashboard.o4s.io/login",
        icon: "pi pi-file",
        component: () => import("@/views/generic-component/Index.vue"),
      },
      {
        name: "Checkbox",
        path: "/checkbox",
        component: () => import("@/views/generic-component/Index.vue"),
      },
      {
        name: "Paginator",
        path: "/paginator",
        component: () => import("@/views/generic-component/Index.vue"),
      },
      {
        name: "Tooltip",
        path: "/tooltip",
        component: () => import("@/views/generic-component/Index.vue"),
      },
    ],
    // children: [
    //   {
    //     name: "InputText",
    //     path: "/o4s-labeled-input-text",
    //     component: () => import("@/views/generic-component/Index.vue"),
    //   },
    // ],
  },
];

export default addDefaultAppMenus(menus);
