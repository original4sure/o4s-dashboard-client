import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import * as api from "../../api/user/auth";

export const useAuthUserStore = defineStore("authUser", () => {
  let user = reactive({
    email: "",
  });
  let isUserLoggedin = ref(false);
  let company = reactive({
    name: "",
    code: "",
    logoPath: "",
  });

  const fetchConfig = async () => {
    const config = await api.fetchConfig();
    if (config) {
      company.name = config?.company?.name;
      company.code = config?.company?.code;
      company.logoPath = config?.company?.logoPath;
      user.email = config?.email;
      isUserLoggedin.value = true;
    } else {
      isUserLoggedin.value = false;
    }
  };

  return { isUserLoggedin, user, company, fetchConfig };
});
