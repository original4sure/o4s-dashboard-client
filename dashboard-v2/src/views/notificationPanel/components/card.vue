<template>
  <div class="flex card-container p-2.5">
    <span class="pr-3 o-text o-secondary-500">
      <i class="pi oi oi-ft-file" style="font-size: 2rem"></i>
    </span>

    <div>
      <O4SText class="pb-1.5" :oLabel="type" oType="xs-semibold" />
      <br />
      <O4SText
        :oLabel="`Distributor-list92.csv file was ${type} successfully.`"
        oType="xs-normal"
      />
      <div class="pb-3 pt-1.5">
        <OTag
          class="mr-2.5"
          oLabel="Failed: 01"
          severity="danger"
          :rounded="false"
        />
        <OTag oLabel="Success: 01" :rounded="false" severity="success" />
      </div>

      <div class="flex justify-between items-center">
        <O4SText
          :oLabel="`2 min ago`"
          oType="xs-normal"
          class="o-text o-secondary-500"
        />
        <span class="text-right o-text o-primary-500">
          <i class="pi oi oi-ft-download" style="font-size: 2rem"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["type"]);
const display = computed(() => props.type);

const type = props.type;
console.log(display, "adsf");
</script>

<style>
.card-container {
  background: #ffffff;
  /* Gray/200 */

  border: 1px solid #eaecf0;
  /* Shadow/md */

  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
}
</style>
