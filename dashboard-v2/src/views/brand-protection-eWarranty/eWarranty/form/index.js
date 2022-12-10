import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEWarrantyStore } from "@/store/brand-protection-eWarranty/eWarranty";
import "./index.scss";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useEWarrantyStore();

    function redirectTolistScreen() {
      router.push("/brand-protection-eWarranty/eWarranty/list");
    }

    onMounted(() => {
      console.log(route.params.warrantyCode)
      store.fetchWarranty(route.params.warrantyCode);
        //emit("update:basicDetail", data.value);
      });

    // <ODivider />
    // <BasicDetail
    //   v-model:basicDetail="skuData.basicDetail"
    // />
    return { redirectTolistScreen, 
      basicDetailData : computed(()=> store.basicDetailData), 
      productDetailData: computed(()=> store.productDetailData)  
    };
  },
};
