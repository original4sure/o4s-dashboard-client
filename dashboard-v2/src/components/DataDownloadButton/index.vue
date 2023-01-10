<template>
  <div>
    <OButton
      :label="label"
      icon="pi pi-cloud-download"
      :ref="'downloadBtn'"
      oType="secondary"
      oColor="secondary"
      @click="handleClick"
      :disabled="disabledBtn"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
// import { getStartTimeStampForUnixTimeStamps } from "@/shared/time";
import { dataDownloadApi } from "../../api/utillity";

let disabledBtn = ref(false);
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: "Export",
  },
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  filters: {
    type: Object,
    required: false,
  },
});

async function handleClick() {
  const { title, tags, jobType, filters } = props;

  //   processFilterStartDate(filters);
  disabledBtn.value = true;

  const result = await dataDownloadApi({
    title,
    tags,
    jobType,
    filters,
  });
  console.log(result, "datado");
  //   if (result && !result.error) {
  //     this.$notify({
  //       group: "appNotificationContainer",
  //       type: "success",
  //       title: "Success",
  //       text: "Your data download request has been submitted successfully",
  //     });
  //   } else {
  //     this.$notify({
  //       group: "appNotificationContainer",
  //       type: "error",
  //       title: "Error",
  //       text: "Your data download request has failed",
  //     });
  //   }
  disabledBtn.value = false;
}

// function processFilterStartDate(filters) {
//   const goLiveDate = this.$store.getters["appConfig/getGoLiveDate"];
//   if (this.tags.includes("CONSUMER_LOGS") && goLiveDate) {
//     filters.startTimestamp = getStartTimeStampForUnixTimeStamps(
//       filters.startTimestamp,
//       goLiveDate
//     );
//   }
// }

watch(
  () => props.filters,
  (filters) => {
    disabledBtn.value = false;
  },
  { immediate: true, deep: true }
);
</script>
