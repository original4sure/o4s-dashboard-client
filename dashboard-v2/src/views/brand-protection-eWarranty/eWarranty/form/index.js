import { onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import FormDialog from "./Dialog.vue";
import eWarrantyApi from "@/api/eWarranty";
import { useAppConfigStore } from "@/store/app-config";
import { DateTime } from "luxon";
import Loader from "@/components/loader/index.vue";
import { downloadFileFromUrl } from "../../../../utils/common/index";
import "./index.scss";

export default {
  components: {
    FormDialog,
    Loader,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const appConfigStore = useAppConfigStore();

    //states
    const display = ref(false);
    const status = ref();
    let basicDetailData = ref([]);
    let productDetailData = ref([]);
    let formLoaded = ref(false);
    let data = ref({});

    const warrantyCode = route?.params?.warrantyCode;

    const fetchWarranty = async function (payload) {
      formLoaded.value = false;
      const response = await eWarrantyApi.fetchWarranty(payload);
      data.value = response?.data?.data;

      const {
        sku,
        userName,
        purchasedFrom,
        purchaseDate,
        userPhoneNumber,
        activationRequestDate,
        productId,
        invoiceNumber,
        manufacturingDate,
        packagingLevel,
        serialNo,
        facilityName,
        batchId,
        ownership,
        warrantyEndDate,
        status,
      } = response?.data?.data || {};

      basicDetailData.value = [
        {
          label: "Mobile",
          value: userPhoneNumber ?? "NA",
        },
        {
          label: "Customer",
          value: userName ?? "NA",
        },
        {
          label: "SKU",
          value: sku?.name ?? "NA",
        },
        {
          label: "Purchased From",
          value: purchasedFrom ?? "NA",
        },
        {
          label: "Requested On",
          value: activationRequestDate
            ? DateTime.fromMillis(activationRequestDate).toFormat(
                "dd LLL, yyyy"
              )
            : "NA",
        },
        {
          label: "Purchased On",
          value: purchaseDate
            ? DateTime.fromMillis(purchaseDate).toFormat("dd LLL, yyyy")
            : "NA",
        },
        {
          label: "Invoice Number",
          value: invoiceNumber ?? "NA",
        },
      ];

      productDetailData.value = [
        {
          label: "Serial Number",
          value: serialNo ?? "NA",
        },
        {
          label: "Batch Number",
          value: batchId ?? "NA",
        },
        {
          label: "Product ID",
          value: productId ?? "NA",
        },
        {
          label: "Manufacturing Plant",
          value: typeof facilityName == "String" ? facilityName : "NA",
        },
        {
          label: "Manufacturing Date",
          value: manufacturingDate
            ? DateTime.fromMillis(manufacturingDate).toFormat("dd LLL, yyyy")
            : "NA",
        },
        {
          label: "Valid Through",
          value: warrantyEndDate
            ? DateTime.fromMillis(+warrantyEndDate).toFormat("dd LLL, yyyy")
            : "NA",
        },
        {
          label: "Status",
          value: status,
        },
      ];

      formLoaded.value = true;
    };

    const openDialog = (value) => {
      status.value = value;
      display.value = true;
    };

    const redirectTolistScreen = () => {
      router.push("/brand-protection-eWarranty/eWarranty/list");
    };

    const changeStatus = async (status) => {
      const response = await eWarrantyApi.changeStatus(warrantyCode, {
        status: status.toUpperCase(),
        companyCode: data.companyCode, // @TODO hardcode for testing
      });

      if (response?.data?.success) {
        openDialog(status);
      }
    };

    onMounted(() => {
      fetchWarranty(warrantyCode);
      appConfigStore.toggleBreadcrumbHeader(false);
    });

    return {
      redirectTolistScreen,
      basicDetailData,
      productDetailData,
      formLoaded,
      data,
      display,
      status,
      changeStatus,
      downloadFileFromUrl,
    };
  },
};
