import { onMounted, computed, ref, watch, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAppConfigStore } from "@/store/app-config";
import Loader from "@/components/loader/index.vue";
import ApiError from "@/components/apiError/index.vue";
import "./index.scss";
import eWarrantyApi from "@/api/eWarranty";
import _ from "lodash";
import { DateTime } from "luxon";

export default {
  components: {
    Loader,
    ApiError,
  },
  setup() {
    const router = useRouter();
    const appConfigStore = useAppConfigStore();

     //states
    let sortByLastUpdated = ref(null);
    let sortByPurchasedOn = ref(null);
    let selectedWarranty = ref({});
    let warrantyList = ref([]);
    let rowPerPage = ref(10);
    let totalCount = ref(0);
    let listloading = ref(false);
    let pageNumber = ref(0);
    let errorMessage = ref("");
    let selectedStatus = ref({ value: "", label: "All Requests" });
    const options = ref([
      { value: "", label: "All Requests" },
      { value: "APPROVED", label: "Approved" },
      { value: "PENDING", label: "Pending" },
      { value: "REJECTED", label: "Rejected" },
    ]);
    
    //api function
    const fetchEWarrantyRequests = async function (
      status,
      sortByLastUpdated,
      sortByPurchased
    ) {
      listloading.value = true;

      console.log("L10", rowPerPage.value, pageNumber.value, status, sortByLastUpdated, sortByPurchased)

      const response = await eWarrantyApi.fetchEWarrantyList(
        rowPerPage.value,
        pageNumber.value,
        status,
        sortByLastUpdated,
        sortByPurchased
      );

      if (response.success) {
        const result = response.data;
        warrantyList.value = result.list.map((item) => {
          return {
            customerName: item.userName,
            inVoiceNo: item.invoiceNumber,
            mobileNumber: item.userPhoneNumber,
            purchaseFrom: item.purchasedFrom,
            purchasedOn: item.purchaseDate ? DateTime.fromMillis(item.purchaseDate).toFormat(
              "LLL dd, yyyy"
            ) : "NA",
            lastUpdatedOn: item.lastUpdatedOn ? DateTime.fromMillis(item.lastUpdatedOn).toLocaleString(
              DateTime.DATETIME_MED
            ) : "NA",
            status: _.capitalize(item.status),
            warrantyCode: item.warrantyCode,
            sku: item.sku,
          };
        });
        totalCount.value = result.totalCount;
        listloading.value = false;
      } else {
        console.log("L2", response);
        errorMessage.value = response.message;
        console.log("L3 ", errorMessage.value);
      }
    };

    function handleRequestDetails(warrantyCode) {
      router.push("/brand-protection-eWarranty/eWarranty/form/" + warrantyCode);
    }

    function onPage(event) {
      pageNumber.value = event.page
      rowPerPage.value = event.rows

      fetchEWarrantyRequests(
        selectedStatus.value.value,
        sortByLastUpdated.value,
        sortByPurchasedOn.value
      );
    }

    function onSort(event) {
      if (event.sortField == "purchasedOn") {
        sortByPurchasedOn.value = event.sortOrder;
        sortByLastUpdated.value = null;
        pageNumber = 0

        fetchEWarrantyRequests(
          selectedStatus.value.value,
          null,
          sortByPurchasedOn.value
        );
      } else if (event.sortField == "lastUpdatedOn") {
        sortByLastUpdated.value = event.sortOrder;
        sortByPurchasedOn.value = null;
        pageNumber = 0

        fetchEWarrantyRequests(
          selectedStatus.value.value,
          sortByLastUpdated.value,
          null
        );
      }
    }

    onMounted(() => {
      fetchEWarrantyRequests(selectedStatus.value.value);
      appConfigStore.toggleBreadcrumbHeader(true);
    });

    watch(selectedStatus, (newSelectedStatus, oldSelectedStatus) => {
      fetchEWarrantyRequests(
        newSelectedStatus.value,
        sortByLastUpdated.value,
        sortByPurchasedOn.value
      );
    });

    watch(selectedWarranty, (newValue, oldValue) => {
      handleRequestDetails(newValue.warrantyCode);
    });

    return {
      options,
      selectedStatus,
      selectedWarranty,
      errorMessage,
      warrantyList,
      rowPerPage,
      totalCount,
      listloading,
      handleRequestDetails,
      onPage,
      onSort
    };
  },
};
