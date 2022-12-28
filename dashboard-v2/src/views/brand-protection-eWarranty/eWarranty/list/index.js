import { onMounted, computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAppConfigStore } from "@/store/app-config";
import { debounce } from "@/utils/common";
import { getFormattedDate } from "@/utils/dateTime";
import "./index.scss";
import eWarrantyApi from "@/api/eWarranty";
import _ from "lodash";
import Filter from "./Filter.vue";
import Loader from "@/components/loader/index.vue";
import ApiError from "@/components/apiError/index.vue";

export default {
  components: {
    Loader,
    ApiError,
    Filter,
  },
  setup() {
    const router = useRouter();
    const appConfigStore = useAppConfigStore();

    //states
    let sortByPurchasedOn = ref(null);
    let selectedWarranty = ref({});
    let warrantyList = ref([]);
    let rowPerPage = ref(10);
    let totalCount = ref(0);
    let listloading = ref(false);
    let pageNumber = ref(0);
    let showFilter = ref(false);
    let errorMessage = ref("");
    let searchKeywords = ref(null);
    let purchasedOnFilter = ref({
      startTimestamp: null,
      endTimestamp: null,
    });
    let invoiceNumber = ref(null);
    let selectedStatus = ref("");

    const payload = computed(() => {
      return {
        pageNumber: pageNumber.value,
        pageSize: rowPerPage.value,
        filters: {
          purchasedOn: {
            startTimestamp: purchasedOnFilter.value.startTimestamp,
            endTimestamp: purchasedOnFilter.value.endTimestamp,
          },
          identity: searchKeywords.value,
          status: selectedStatus.value ? selectedStatus.value : "",
          "warrantyData.invoice": invoiceNumber.value,
        },
        sorts: {
          "warrantyData.purchasedOn": sortByPurchasedOn.value,
        },
      };
    });

    //api function
    const fetchEWarrantyRequests = async function (payload) {
      listloading.value = true;

      const response = await eWarrantyApi.fetchEWarrantyListApi(payload);

      if (response.success) {
        const result = response.data;
        warrantyList.value = result.list.map((item) => {
          return {
            customerName: item.userName,
            inVoiceNo: item.invoiceNumber,
            mobileNumber: item.userPhoneNumber,
            purchaseFrom: item.purchasedFrom,
            purchasedOn: item.purchaseDate
              ? getFormattedDate(item.purchaseDate)
              : "NA",
            lastUpdatedOn: item.lastUpdatedOn
              ? getFormattedDate(item.lastUpdatedOn, "amPm")
              : "NA",
            status: _.capitalize(item.status),
            warrantyCode: item.warrantyCode,
            sku: item.sku,
            productId: item.productId ? item.productId.toString() : "NA",
          };
        });
        totalCount.value = result.totalCount;
        listloading.value = false;
      } else {
        errorMessage.value = response.message;
      }
    };

    function handleRequestDetails(warrantyCode) {
      router.push("/brand-protection-eWarranty/eWarranty/form/" + warrantyCode);
    }

    function handleFilter() {
      showFilter.value = !showFilter.value;
    }

    function applyFilter(filter) {
      purchasedOnFilter.value.startTimestamp =
        filter.purchasedOn.startTimestamp;
      purchasedOnFilter.value.endTimestamp = filter.purchasedOn.endTimestamp;
      selectedStatus.value = filter.status;
      invoiceNumber.value = filter.invoice;
      handleFilter();
    }

    function onPage(event) {
      pageNumber.value = event.page;
      rowPerPage.value = event.rows;
    }

    function onSort(event) {
      sortByPurchasedOn.value = event.sortOrder;
      pageNumber.value = 0;
    }

    function onSearch(event) {
      debounce(function () {
        searchKeywords.value = event.target.value;
      }, 500)();
    }

    function resetFilter() {
      purchasedOnFilter.value.startTimestamp = null;
      purchasedOnFilter.value.endTimestamp = null;
    }

    watch(selectedWarranty, () => {
      handleRequestDetails(selectedWarranty.value.warrantyCode);
    });

    watch(payload, () => {
      fetchEWarrantyRequests(payload.value);
    });

    onMounted(() => {
      fetchEWarrantyRequests(payload.value);
      appConfigStore.toggleBreadcrumbHeader(true);
    });

    return {
      selectedWarranty,
      errorMessage,
      warrantyList,
      rowPerPage,
      showFilter,
      totalCount,
      listloading,
      searchKeywords,
      applyFilter,
      resetFilter,
      handleRequestDetails,
      handleFilter,
      onPage,
      onSort,
      onSearch,
    };
  },
};
