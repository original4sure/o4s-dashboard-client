import { onMounted, ref } from "vue";
import { fetchJobList } from "../../api/utillity";
import { getFormattedDate } from "../../utils/dateTime";
import Card from "./components/card.vue";
import "./index.scss";

export default {
  components: { Card },
  setup() {
    let loading = ref(false);
    let list = ref({});
    let selectJobType = ref("upload");

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
          console.log({ source: dataSource.fileName });
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
          };
        })
        .sort((a, b) => {
          return b.jobCreatedAt - a.jobCreatedAt;
        });

      // await new Promise((resolve) => {
      //   this.timeoutId = setTimeout(resolve, 5000);
      // });

      // this.pollData();
    };

    const handleJobType = (type) => {
      selectJobType.value = type;
      fetchData();
    };

    onMounted(() => {
      fetchData();
    });

    return { list, loading, handleJobType, selectJobType };
  },
};
