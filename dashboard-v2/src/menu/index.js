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
    redirect: { name: "BrandProtectionAndEWarranty-eWarranty-list" },
  },
  { ...ewarranty },
];

export default addDefaultAppMenus(menu);
