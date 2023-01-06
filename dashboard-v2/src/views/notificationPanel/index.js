import { onMounted, ref } from "vue";
import { fetchJobList } from "../../api/utillity";
import Card from "./components/card.vue";

export default {
  components: { Card },
  setup() {
    let loading = ref(false);
    let data = ref({});

    //Api calling
    const fetchData = async function (payload = "UPLOAD") {
      loading.value = false;

      const response = await fetchJobList(payload);
      data.value = response.data;

      loading.value = true;
    };

    onMounted(() => {
      fetchData();
    });

    return {};
  },
};
