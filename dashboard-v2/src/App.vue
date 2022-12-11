<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import { O4SText } from "o4s-ui";
import "./App.scss";
// import OUMenuBar from "o4s-ui/utils/components/ou-menu-bar/OUMenuBar.vue";
// import OUMenuBreadcrumb from "o4s-ui/utils/components/ou-menu-breadcrumb/OUMenuBreadcrumb.vue";
import { OUMenuBar, OUMenuBreadcrumb } from "o4s-ui";
import menuobj from "./menu/menu";
const menu = reactive(menuobj);
const activeNavigationList = ref([]);
const appMenuBar = ref(null);
onMounted(() => {
  alert("dashbaord");
  console.log("Dashbaord watched " + appMenuBar.value.$el.tagName);
  // appMenuBar.value.routeChange({ matched: [] });
});

const route = useRoute();
watch(route, (route) => {
  if (appMenuBar.value) {
    appMenuBar.value.routeChange(route);
  }
});

const onNavigationChange = (activeNavigations) => {
  alert();
  console.log("Example : " + JSON.stringify(activeNavigations));
  activeNavigationList.value = activeNavigations;
};
</script>

<template>
  <div class="root-layout overflow-hidden">
    <div class="side-menu">
      <OUMenuBar
        @onChange="onNavigationChange"
        v-model:menu="menu"
        ref="appMenuBar"
      />
    </div>
    <div class="root-container o-bg-secondary-100">
      <div>
        <OUMenuBreadcrumb :model="activeNavigationList" />
        <RouterView />
      </div>
    </div>
  </div>
</template>
