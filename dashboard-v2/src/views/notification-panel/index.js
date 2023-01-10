import { computed, onMounted, ref, watch } from "vue";
import { fetchJobList } from "../../api/utillity";
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
    let timeoutId = undefined;
    let notificationVisiblity = ref(false);

    //Api calling
    const fetchData = async function () {
      loading.value = false;
      const payload = { kind: selectJobType.value.toUpperCase() };
      const response = await fetchJobList(payload);
      makeData(response.data);
      loading.value = true;
    };

    const makeData = async (value) => {
      console.log(value, "ASDF");
      list.value = value.list
        .map((job) => {
          let jobRowState = job.state;
          let tags = job.tags;
          let progressState = job.status;
          let dataSource = job.dataSource || {};
          let reportUrl = (job.output && job.output.reportUrl) || undefined;
          return {
            csvName: dataSource.fileName || "******.csv",
            // requestDate: getDateShort2(moment.unix(job.createdAt / 1000)),
            requestDate: job.createdAt,

            totalRows: jobRowState && jobRowState.totalRecords,
            tags,
            jobId: job.jobId,
            rowsProcessed: jobRowState && jobRowState.totalProcessed,
            success: jobRowState?.totalSuccess || 0,
            failed:
              Number(jobRowState?.totalRecords || 0) -
              Number(jobRowState?.totalSuccess || 0),
            progressState,
            // elapsedTimeFromNow: moment(job.createdAt).from(new Date()),
            elapsedTimeFromNow: getFormattedDate(job.createdAt),
            key: job.jobId || Date.now() + Date.now(),
            reportUrl,
            jobCreatedAt: job.createdAt,
            showDownloadButton: showDownloadButton(job.status),
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

    const showDownloadButton = (status) => {
      if (selectJobType == "upload" && status == "SUCCESS") {
        return false;
      }

      if (selectJobType == "download" && status == "FAILED") {
        return false;
      }

      return true;
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
