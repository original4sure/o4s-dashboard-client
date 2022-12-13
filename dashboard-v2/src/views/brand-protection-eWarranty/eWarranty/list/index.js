import { onMounted, computed, ref, watch} from "vue";
import { useRouter } from "vue-router";
import { useEWarrantyListStore } from "@/store/brand-protection-eWarranty/eWarranty";
import "./index.scss";

export default {
  setup() {
    const router = useRouter();
    const store = useEWarrantyListStore();
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
      console.log(event)
      store.$patch(state => {
        state.pageNumber = event.page
        state.rowPerPage = event.rows
      })
      store.fetchEWarrantyRequests(selectedStatus.value.value);
    }

    onMounted(() => {
      store.fetchEWarrantyRequests(selectedStatus.value.value);
    });

    watch(selectedStatus, (newSelectedStatus, oldSelectedStatus) => {
      console.log(newSelectedStatus)
      store.fetchEWarrantyRequests(newSelectedStatus.value);
    })

    return {
      options,
      selectedStatus,
      handleRequestDetails,
      onPage,
      warrantyList: computed(() => store.warrantyList),
      rowPerPage: computed(() => store.rowPerPage),
      totalCount: computed(() => store.totalCount),
      listloading: computed(()=> store.listloading)
    };
  },
};
