import { addDefaultAppMenus } from "o4s-ui/utils";
import ewarranty from "./ewarranty";

const menu = [
  {
    name: "Dashboard",
    label: "Dashboard",
    url: "https://dev-dashboard.o4s.io/login",
    icon: "pi pi-home",
  },
  { ...ewarranty },
];

export default addDefaultAppMenus(menu);
