import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEWarrantyFromStore } from "@/store/brand-protection-eWarranty/eWarranty";
import "./index.scss";

export default {
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

    return {
      redirectTolistScreen,
      basicDetailData: computed(() => store.basicDetailData),
      productDetailData: computed(() => store.productDetailData),
      formLoaded: computed(()=> store.formLoaded)
    };
  },
};
