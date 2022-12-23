import { onMounted, computed, ref, watch, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAppConfigStore } from "@/store/app-config";
import Loader from "@/components/loader/index.vue";
import ApiError from "@/components/apiError/index.vue";
import "./index.scss";
import eWarrantyApi from "@/api/eWarranty";
import _ from "lodash";
import { DateTime } from "luxon";
import Filter from "./Filter.vue"
import { debounce } from '../../../../utils/common'

export default {
  components: {
    Loader,
    ApiError,
    Filter
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
    let showFilter = ref(false)
    let errorMessage = ref("");
    let searchKeywords = ref(null);
    let purchasedOnFilter = ref({
        startTimestamp: null,
        endTimestamp: null
    })
    let selectedStatus = ref("");

    const payload = computed(()=>{
      return {
        pageNumber: pageNumber.value,
        pageSize: rowPerPage.value,
        filters: {
            purchasedOn: {
                startTimestamp: purchasedOnFilter.value.startTimestamp,
                endTimestamp: purchasedOnFilter.value.endTimestamp
            },
            identity : searchKeywords.value,
            status: selectedStatus.value ? selectedStatus.value : ""
        },
        sorts: {
            "warrantyData.purchasedOn": sortByPurchasedOn.value
        }
      }
    })
    
    //api function
    const fetchEWarrantyRequests = async function () {
      listloading.value = true;

      const response = await eWarrantyApi.fetchEWarrantyList(payload.value);
      
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
            productId: item.productId
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
    };

    function handleFilter(){
      showFilter.value = !showFilter.value
    }

    function applyFilter(filter){
      console.log(filter)
      purchasedOnFilter.value.startTimestamp = filter.purchasedOn.startTimestamp
      purchasedOnFilter.value.endTimestamp = filter.purchasedOn.endTimestamp
      selectedStatus.value = filter.status
      handleFilter()
    }

    function onPage(event) {
      pageNumber.value = event.page
      rowPerPage.value = event.rows
    }

    function onSort(event) {
      sortByPurchasedOn.value = event.sortOrder;
      pageNumber.value = 0
    }

    function resetFilter(){
      console.log('reseting')
      purchasedOnFilter.value.startTimestamp = null
      purchasedOnFilter.value.endTimestamp = null
    }

    onMounted(() => {
      fetchEWarrantyRequests(payload.value);
      appConfigStore.toggleBreadcrumbHeader(true);
    });

    watch(selectedWarranty, (newValue, oldValue) => {
      handleRequestDetails(newValue.warrantyCode);
    });

    watch(payload, () => {
      fetchEWarrantyRequests(payload.value)
    })

    return {
      selectedStatus,
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
      onSort
    };
  },
};
