import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useEWarrantyStore } from "@/store/eWarranty";
import "./index.scss";

export default {
  setup() {
    const router = useRouter();
    const store = useEWarrantyStore();
    const skus = store.skus;

    function handleRequestDetails() {
      router.push("/brand-protection-eWarranty/eWarranty/form");
    }

    onMounted(() => {
      store.fetchWarranty();
      store.fetchEWarrantyRequests();
    });

    return { handleRequestDetails, skus };
  },
};
