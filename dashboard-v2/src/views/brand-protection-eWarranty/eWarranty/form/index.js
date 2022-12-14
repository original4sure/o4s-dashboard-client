import { onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useEWarrantyFromStore } from "@/store/brand-protection-eWarranty/eWarranty";
import FormDialog from "./Dialog.vue";
import eWarrantyApi from "../../../../api/eWarranty";

import "./index.scss";

export default {
  components: {
    FormDialog,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useEWarrantyFromStore();

    const display = ref(false);
    const status = ref();
    const warrantyCode = route?.params?.warrantyCode;

    onMounted(() => {
      store.fetchWarranty(warrantyCode);
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
        companyCode: "NovaDesiGhee" || companyCode, // @TODO hardcode for testing
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
