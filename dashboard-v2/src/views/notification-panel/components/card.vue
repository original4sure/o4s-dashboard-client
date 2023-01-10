<template>
  <div class="flex card-container p-2.5">
    <span class="pr-3 o-text o-secondary-500">
      <i class="pi oi oi-ft-file" style="font-size: 2rem"></i>
    </span>

    <div class="w-full">
      <O4SText class="pb-1.5" :oLabel="data.csvName" oType="xs-semibold" />
      <br />
      <O4SText
        :oLabel="`${data.csvName} file was ${type} successfully.`"
        oType="xs-normal"
      />
      <div class="pb-3 pt-1.5">
        <div class="flex" v-if="data.showState?.status">
          <span class="o-warning-500 mr-3">{{ data.showState?.label }}</span>

          <span v-if="data.showState?.type == 'spinner'"
            ><Spinner :type="'macos'"> </Spinner
          ></span>

          <!-- <span v-if="data.showState?.type == 'progressBar'"></span>
          <ProgressBar :value="data.showState?.value" :showValue="false" /> -->
        </div>

        <div v-else>
          <OTag
            class="mr-2.5"
            :oLabel="`Failed: ${data.failed}`"
            severity="danger"
            :rounded="false"
          />
          <OTag
            :oLabel="`Success: ${data.success}`"
            :rounded="false"
            severity="success"
          />
        </div>
      </div>

      <div class="flex justify-between items-center">
        <O4SText
          :oLabel="data.elapsedTimeFromNow"
          oType="xs-normal"
          class="o-text o-secondary-500"
        />
        <span
          v-if="data.showDownloadButton"
          class="text-right o-text o-primary-500"
        >
          <a :href="`${data.reportUrl}`" download target="_blank">
            <i class="pi oi oi-ft-download" style="font-size: 2rem"></i>
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Spinner from "../../../components/spinner/index.vue";
const { type, data } = defineProps(["type", "data"]);
</script>

<style>
.card-container {
  background: #ffffff;
  border: 1px solid #eaecf0;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
}
</style>
