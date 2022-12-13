<script setup>
import { ref, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { RouterView } from "vue-router";
import { O4SAppMenu } from "@original4sure/o4s-ui";
import menuobj from "./menu";
const menu = reactive(menuobj);
const appMenu = ref(null);

const route = useRoute();
watch(route, (route) => {
  if (appMenu.value) {
    appMenu.value.routeChange(route);
  }
});
</script>

<template>
  <div v-if="menu">
    <O4SAppMenu v-model="menu" ref="appMenu">
      <template #app-page>
        <RouterView />
      </template>
    </O4SAppMenu>
  </div>
</template>
