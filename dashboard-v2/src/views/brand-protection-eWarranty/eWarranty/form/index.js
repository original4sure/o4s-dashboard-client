import { onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useEWarrantyFromStore } from "@/store/brand-protection-eWarranty/eWarranty";
import FormDialog from "./Dialog.vue";
import eWarrantyApi from "../../../../api/eWarranty";
import { useAppConfigStore } from "@/store/app-config";
import Loader from "@/components/loader/index.vue";

import "./index.scss";

export default {
  components: {
    FormDialog,
    Loader,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useEWarrantyFromStore();
    const appConfigStore = useAppConfigStore();

    const display = ref(false);
    const status = ref();
    const warrantyCode = route?.params?.warrantyCode;

    onMounted(() => {
      store.fetchWarranty(warrantyCode);
      appConfigStore.toggleBreadcrumbHeader(false);
    });

    const openDialog = (value) => {
      status.value = value;
      display.value = true;
    };

    const redirectTolistScreen = () => {
      router.push("/brand-protection-eWarranty/eWarranty/list");
    };

    const openLinkInNewTab = (url, target = "_blank") => {
      if (url) {
        window.open(url, target, "noreferrer");
      }
    };

    const changeStatus = async (status) => {
      const response = await eWarrantyApi.changeStatus(warrantyCode, {
        status: status.toUpperCase(),
        companyCode: store.data.companyCode, // @TODO hardcode for testing
      });

      if (response?.data?.success) {
        openDialog(status);
      }
    };

    return {
      redirectTolistScreen,
      basicDetailData: computed(() => store.basicDetailData),
      productDetailData: computed(() => store.productDetailData),
      formLoaded: computed(() => store.formLoaded),
      data: computed(() => store.data),
      openLinkInNewTab,
      display,
      status,
      changeStatus,
    };
  },
};
