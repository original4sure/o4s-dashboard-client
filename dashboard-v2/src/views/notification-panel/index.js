import { computed, onMounted, ref, watch } from "vue";
import { fetchJobListApi } from "../../api/utillity";
import { getFormattedDate } from "../../utils/dateTime";
import Card from "./components/card.vue";
import "./index.scss";

export default {
  components: { Card },
  props: {
    showNotification: {
      type: [Boolean],
      required: true,
    },
  },
  setup(props) {
    let loading = ref(false);
    let list = ref({});
    let selectJobType = ref("upload");
    let notificationVisiblity = ref(false);

    let timeoutId = undefined;

    //Api calling
    const fetchData = async function () {
      loading.value = false;

      const payload = { kind: selectJobType.value.toUpperCase() };
      const response = await fetchJobListApi(payload);

      makeData(response.data);
      loading.value = true;
    };

    const makeData = async (value) => {
      list.value = value.list
        .map((job) => {
          const {
            state: { totalRecords, totalSuccess, totalProcessed },
            status: progressState,
            dataSource,
            output: { reportUrl },
            createdAt,
            tags,
            jobId,
          } = job;

          function getFailedCount() {
            const count = Number(totalRecords || 0) - Number(totalSuccess || 0);
            return count > 0 ? count : 0;
          }

          function showState() {
            if (progressState === "IN_PROGRESS") {
              return {
                status: true,
                type: "progressBar",
                label: "In Progress",
                value: (totalProcessed * 100) / totalRecords || 0,
              };
            }

            if (progressState === "PENDING" || progressState === "INGESTING") {
              return {
                status: true,
                type: "spinner",
                label: "Initiating",
              };
            }

            if (progressState === "REPORTING") {
              return {
                status: true,
                type: "spinner",
                label: "Generating Report",
              };
            }
          }

          function showDownloadButton() {
            if (progressState == "PARTIALLY_COMPLETED") {
              return true;
            }

            if (
              selectJobType.value == "download" &&
              progressState == "COMPLETED"
            ) {
              return true;
            }

            return false;
          }

          return {
            csvName: dataSource.fileName || "******.csv",
            // requestDate: getDateShort2(moment.unix(job.createdAt / 1000)),
            tags,
            success: totalSuccess || 0,
            failed: getFailedCount(),
            progressState,
            // elapsedTimeFromNow: moment(job.createdAt).from(new Date()),
            elapsedTimeFromNow: getFormattedDate(createdAt),
            key: jobId || Date.now() + Date.now(),
            reportUrl,
            jobCreatedAt: createdAt,
            showDownloadButton: showDownloadButton(),
            showState: showState(),
          };
        })
        .sort((a, b) => {
          return b.jobCreatedAt - a.jobCreatedAt;
        });

      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, 5000);
      });

      fetchData();
    };

    const handleJobType = (type) => {
      selectJobType.value = type;
      fetchData();
    };

    watch(
      () => props.showNotification,
      (showNotification) => {
        notificationVisiblity.value = showNotification;
        if (notificationVisiblity.value) {
          fetchData();
        } else {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        }
      },
      { immediate: true, deep: true }
    );

    return { list, loading, handleJobType, selectJobType };
  },
};
