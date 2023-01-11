<template>
  <div>
    <OButton
      :label="label"
      icon="pi pi-cloud-download"
      :ref="'downloadBtn'"
      oType="secondary"
      oColor="secondary"
      @click="handleClick"
    />
  </div>
</template>

<script setup>
// import { getStartTimeStampForUnixTimeStamps } from "@/shared/time";
import { dataDownloadApi } from "../../api/utillity";

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
  const result = await dataDownloadApi({
    title,
    tags,
    jobType,
    filters,
  });
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
</script>
