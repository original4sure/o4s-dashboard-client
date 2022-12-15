/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from "vue-router";
import { createRouteFromMenu } from "o4s-ui/utils";
import menu from "../menu";
import { isAuthTokenValid } from "../shared/auth";
const create_router = createRouteFromMenu(menu);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: create_router,
});

router.beforeEach((to, from, next) => {
  if (isAuthTokenValid()) {
    next();
  } else {
    window.location.replace("/");
  }
});

export default router;
