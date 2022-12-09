import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useEWarrantyStore } from "@/store/eWarranty";
import "./index.scss";

export default {
  setup() {
    const router = useRouter();
    // const store = useEWarrantyStore();
    // const skus = store.skus;
    const basicDetailData = ref([
      {
        label: "Mobile",
        value: "Text",
      },
      {
        label: "Customer",
        value: "Text",
      },
      {
        label: "SKU",
        value: "Text",
      },
      {
        label: "Purchased From",
        value: "Text",
      },
      {
        label: "Requested On",
        value: "Text",
      },
      {
        label: "Purchased On",
        value: "Text",
      },
      {
        label: "Invoice Number",
        value: "Text",
      },
    ]);

    const productDetailData = ref([
      {
        label: "Serial Number",
        value: "Text",
      },
      {
        label: "Batch Number",
        value: "Text",
      },
      {
        label: "Product ID",
        value: "Text",
      },
      {
        label: "Level",
        value: "Text",
      },
      {
        label: "Manufacturing Plant",
        value: "Text",
      },
      {
        label: "Manufacturing Date",
        value: "Text",
      },
      {
        label: "Ownership",
        value: "Text",
      },
    ]);

    function redirectTolistScreen() {
      router.push("/brand-protection-eWarranty/eWarranty/list");
    }

    // onMounted(() => {
    //   store.fetchWarranty();
    //   store.fetchEWarrantyRequests();
    // });

    // onMounted(() => {
    //     emit("update:basicDetail", data.value);
    //   });

    // <ODivider />
    // <BasicDetail
    //   v-model:basicDetail="skuData.basicDetail"
    // />

    return { redirectTolistScreen, basicDetailData, productDetailData };
  },
};
