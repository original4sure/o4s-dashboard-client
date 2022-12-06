<script setup>
import { ref, reactive } from "vue";
import { RouterView } from "vue-router";
// import OUMenuBar from "o4s-ui/utils/components/ou-menu-bar/OUMenuBar.vue";
// import OUMenuBreadcrumb from "o4s-ui/utils/components/ou-menu-breadcrumb/OUMenuBreadcrumb.vue";
import { OUMenuBar, OUMenuBreadcrumb } from "o4s-ui";
import menuobj from "./menu/menu";
const menu = reactive(menuobj);
const activeNavigationList = ref([]);
const onNavigationChange = (activeNavigations) => {
  alert();
  console.log("Example : " + JSON.stringify(activeNavigations));
  activeNavigationList.value = activeNavigations;
};
</script>

<template>
  <div class="root-layout overflow-hidden">
    <div class="side-menu">
      <OUMenuBar @change="onNavigationChange" v-model:menu="menu" />
    </div>
    <div class="root-container o-bg-secondary-100">
      <div>
        <OUMenuBreadcrumb :model="activeNavigationList" />
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable vue/no-unused-components */
import { O4SText } from "o4s-ui";
import "./App.scss";
export default {
  name: "App",
  components: {
    O4SText,
  },
};
</script>
<style scoped></style>
