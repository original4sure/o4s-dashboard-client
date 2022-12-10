import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useEWarrantyStore } from "@/store/brand-protection-eWarranty/eWarranty";
import "./index.scss";

export default {
  setup() {
    const router = useRouter();
    const store = useEWarrantyStore();

    function handleRequestDetails() {
      router.push("/brand-protection-eWarranty/eWarranty/form");
    }

    onMounted(() => {
      store.fetchWarranty();
      store.fetchEWarrantyRequests();
    });

    return { 
      handleRequestDetails, 
      warrantyList : computed(()=> store.warrantyList)
    };
  },
};
