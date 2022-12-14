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
      company.name = config?.data?.company?.name;
      company.code = config?.data?.company?.code;
      company.logoPath = config?.data?.company?.logoPath;
      user.email = config.data.email;
      isUserLoggedin.value = true;
    } else {
      isUserLoggedin.value = false;
    }
  };

  return { isUserLoggedin, user, company, fetchConfig };
});
