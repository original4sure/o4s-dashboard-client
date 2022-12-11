import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useEWarrantyListStore } from "@/store/brand-protection-eWarranty/eWarranty";
import "./index.scss";

export default {
  setup() {
    const router = useRouter();
    const store = useEWarrantyListStore();

    function handleRequestDetails(warrantyCode) {
      router.push("/brand-protection-eWarranty/eWarranty/form/" + warrantyCode);
    }

    onMounted(() => {
      store.fetchEWarrantyRequests();
    });

    return {
      handleRequestDetails,
      warrantyList: computed(() => store.warrantyList),
      rowPerPage: computed(() => store.rowPerPage),
    };
  },
};
