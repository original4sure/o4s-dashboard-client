import { addDefaultAppMenus } from "o4s-ui/utils";
import ewarranty from "./eWarranty";

const menu = [
  {
    name: "Dashboard",
    label: "Dashboard",
    url: "/",
    icon: "pi pi-home",
  },
  {
    name: "dashbaord-v2",
    label: "Dashboard v2",
    path: "/",
    visible: false,
    redirect: { name: "E-Warranty" },
  },
  {
    // @TODO will remove 
    name: "notification",
    label: "Notification",
    path: "/notify",
    exact: true,
    visible: true,
    component: () => import("@/views/notificationPanel/index.vue"),
  },
  { ...ewarranty },
];

export default addDefaultAppMenus(menu);
