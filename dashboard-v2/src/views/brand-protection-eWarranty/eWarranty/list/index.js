import { onMounted, computed, ref, watch} from "vue";
import { useRouter } from "vue-router";
import { useEWarrantyListStore } from "@/store/brand-protection-eWarranty/eWarranty";
import "./index.scss";

export default {
  setup() {
    const router = useRouter();
    const store = useEWarrantyListStore();
    let sortByLastUpdated = ref(null);
    let sortByPurchasedOn = ref(null);
    const options = ref([
      {value: '', label: 'All Requests'},
      {value: 'APPROVED', label: 'Approved'},
      {value: 'PENDING', label: 'Pending'},
      {value: 'REJECTED', label: 'Rejected'},
    ])

    const selectedStatus = ref({value: '', label: 'All Requests'})

    function handleRequestDetails(warrantyCode) {
      router.push("/brand-protection-eWarranty/eWarranty/form/" + warrantyCode);
    } 

    function onPage(event) {
      store.$patch(state => {
        state.pageNumber = event.page
        state.rowPerPage = event.rows
      })
      store.fetchEWarrantyRequests(selectedStatus.value.value);
    }

    function onSort(event) {
      if(event.sortField == 'purchasedOn') {
        sortByPurchasedOn.value = event.sortOrder
      }else if (event.sortField ==  "lastUpdatedOn") {
        sortByLastUpdated.value = event.sortOrder
      }
    }

    onMounted(() => {
      store.fetchEWarrantyRequests(selectedStatus.value.value);
    });

    watch(selectedStatus, (newSelectedStatus, oldSelectedStatus) => {
      store.fetchEWarrantyRequests(newSelectedStatus.value, sortByLastUpdated.value, sortByPurchasedOn.value);
    })

    watch(sortByPurchasedOn, (newValue, oldValue)=>{
      store.fetchEWarrantyRequests(selectedStatus.value.value, newValue, null);
    })

    watch(sortByLastUpdated, (newValue, oldValue)=>{
      store.fetchEWarrantyRequests(selectedStatus.value.value, null, newValue);
    })

    return {
      options,
      selectedStatus,
      handleRequestDetails,
      onPage,
      onSort,
      warrantyList: computed(() => store.warrantyList),
      rowPerPage: computed(() => store.rowPerPage),
      totalCount: computed(() => store.totalCount),
      listloading: computed(()=> store.listloading)
    };
  },
};
