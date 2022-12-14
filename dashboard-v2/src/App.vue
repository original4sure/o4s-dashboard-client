<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { RouterView } from "vue-router";
import { O4SAppMenu } from "o4s-ui";
import { useAuthUserStore } from "./store/user/auth";
import menuobj from "./menu";
import { removeTokenFromStorage } from "./shared/auth";

const menu = reactive(menuobj);
const appMenu = ref(null);

const route = useRoute();
watch(route, (route) => {
  if (appMenu.value) {
    appMenu.value.routeChange(route);
  }
});
const authUserStore = useAuthUserStore();
onMounted(async () => {
  await authUserStore.fetchConfig();
  appMenu.value.routeChange(route);
});
const logoutAction = () => {
  authUserStore.$state.isUserLoggedin = false;
  removeTokenFromStorage();
  window.location.replace("/");
};
</script>

<template>
  <div>
    <div v-if="authUserStore.$state.isUserLoggedin">
      <O4SAppMenu
        v-model="menu"
        ref="appMenu"
        :profile="{
          user: authUserStore.$state.user,
          company: authUserStore.$state.company,
        }"
        @logout="logoutAction"
      >
        <template #app-page>
          <RouterView />
        </template>
      </O4SAppMenu>
    </div>
    <div v-else>
      <div
        class="loader-screen h-96 flex flex-col gap-4 justify-center items-center"
      >
        <div class="lds-dual-ring"></div>
        <div>
          <O4SText oType="md-normal" oLabel="Loading Dashboard V2..." />
        </div>
      </div>
    </div>
  </div>
</template>
