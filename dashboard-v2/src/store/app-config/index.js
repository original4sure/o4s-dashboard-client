import { defineStore } from "pinia";
import { reactive } from "vue";

export const useAppConfigStore = defineStore("appConfigStore", () => {
  let menuConfig = reactive({
    breadcrumbVisible: true,
    breadcrumbHomeIconVisible: false,
  });

  const toggleBreadcrumbHeader = (status) => {
    menuConfig.breadcrumbVisible = status ?? !menuConfig.breadcrumbVisible;
  };

  return { menuConfig, toggleBreadcrumbHeader };
});
