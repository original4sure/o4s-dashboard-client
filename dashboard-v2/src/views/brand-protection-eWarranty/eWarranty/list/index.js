import { onMounted, computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useEWarrantyListStore } from "@/store/brand-protection-eWarranty/eWarranty";
import oops from "../../../../assets/oops.gif";
import { useAppConfigStore } from "@/store/app-config";
import Loader from '@/components/loader/index.vue'
import "./index.scss";

export default {
  components: {
    Loader,
  },
  setup() {
    const router = useRouter();
    const store = useEWarrantyListStore();
    const appConfigStore = useAppConfigStore();
    let sortByLastUpdated = ref(null);
    let sortByPurchasedOn = ref(null);
    let selectedWarranty = ref({});
    const options = ref([
      { value: "", label: "All Requests" },
      { value: "APPROVED", label: "Approved" },
      { value: "PENDING", label: "Pending" },
      { value: "REJECTED", label: "Rejected" },
    ]);

    const selectedStatus = ref({ value: "", label: "All Requests" });

    function handleRequestDetails(warrantyCode) {
      router.push("/brand-protection-eWarranty/eWarranty/form/" + warrantyCode);
    }

    function onPage(event) {
      store.$patch((state) => {
        state.pageNumber = event.page;
        state.rowPerPage = event.rows;
      });
      store.fetchEWarrantyRequests(
        selectedStatus.value.value,
        sortByLastUpdated.value,
        sortByPurchasedOn.value
      );
    }

    function onSort(event) {
      if (event.sortField == "purchasedOn") {
        sortByPurchasedOn.value = event.sortOrder;
        sortByLastUpdated.value = null;
        store.$patch((state) => {
          state.pageNumber = 0;
        });
        store.fetchEWarrantyRequests(
          selectedStatus.value.value,
          null,
          sortByPurchasedOn.value
        );
      } else if (event.sortField == "lastUpdatedOn") {
        sortByLastUpdated.value = event.sortOrder;
        sortByPurchasedOn.value = null;
        store.$patch((state) => {
          state.pageNumber = 0;
        });
        store.fetchEWarrantyRequests(
          selectedStatus.value.value,
          sortByLastUpdated.value,
          null
        );
      }
    }

    onMounted(() => {
      store.fetchEWarrantyRequests(selectedStatus.value.value);
      appConfigStore.toggleBreadcrumbHeader(true);
    });

    watch(selectedStatus, (newSelectedStatus, oldSelectedStatus) => {
      store.fetchEWarrantyRequests(
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
      handleRequestDetails,
      onPage,
      onSort,
      oops,
      errorMessage: computed(() => store.errorMessage),
      warrantyList: computed(() => store.warrantyList),
      rowPerPage: computed(() => store.rowPerPage),
      totalCount: computed(() => store.totalCount),
      listloading: computed(() => store.listloading),
    };
  },
};
