import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEWarrantyFromStore } from "@/store/brand-protection-eWarranty/eWarranty";
import FormDialog from "./Dialog.vue";

import "./index.scss";

export default {
  components: {
    FormDialog,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useEWarrantyFromStore();

    function redirectTolistScreen() {
      router.push("/brand-protection-eWarranty/eWarranty/list");
    }

    onMounted(() => {
      store.fetchWarranty(route.params.warrantyCode);
    });

    function openLinkInNewTab(url, target = "_blank") {
      if (url) {
        window.open(url, target, "noreferrer");
      }
    }

    return {
      redirectTolistScreen,
      basicDetailData: computed(() => store.basicDetailData),
      productDetailData: computed(() => store.productDetailData),
      formLoaded: computed(() => store.formLoaded),
      data: computed(() => store.data),
      openLinkInNewTab,
    };
  },
};
