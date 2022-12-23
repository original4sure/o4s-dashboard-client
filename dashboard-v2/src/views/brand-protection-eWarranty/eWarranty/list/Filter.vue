<template>
      <ODialog
        :visible="display"
        @input="$emit('update:visible', $event.target.value)"
        header=" "
        :draggable="false"
        :modal="true"
        style="width: auto"
        position="right"
        :style="{width: '25vw', height: '100vh'}"
      >
      <div class="h-screen" >
        <O4SDropdown oLabel="Status" v-model="status" :options="options" optionLabel="label" placeholder="Select a Status"/>
        <O4SInputCalendar oLabel="Purchased On" v-model="date" selectionMode="range" dateFormat="dd.mm.yy"/>
      </div>
      <template #footer>
        <div class="flex justify-between">
            <OButton
                label="Reset"
                oType="outline"
                oColor="secondary"
                @click="resetFilter"
                icon="pi pi-replay"
            />
            <OButton
                label="Update"
                oType="primary"
                oColor="primary"
                @click="$emit('applyFilter', filterObject)"
            />
        </div>
      </template>

      </ODialog>
  </template>

<style lang="scss">
.p-dialog-mask {
  align-items: start;
}

.p-dialog-right .p-dialog{
  margin: 0;
}

</style>
  
<script setup>
  import { computed, ref } from "vue";
  import { getUnixTimeStamp } from "@/utils/dateTime"

  let status = ref(null)
  let date = ref(null)

  let filterObject = computed(() => {
    return {
      purchasedOn : {
        startTimestamp: date.value ? getUnixTimeStamp(date.value[0]) : null,
        endTimestamp: date.value ? getUnixTimeStamp(date.value[1]) + 86400000 : null,
      },
      status: status.value ? status.value.value : null
    }
  });

  let options = [
    { value: "APPROVED", label: "Approved" },
    { value: "PENDING", label: "Pending" },
    { value: "REJECTED", label: "Rejected" },
  ]

  function resetFilter(){
    date.value = null;
    status.value = null
  }
  
  const props = defineProps(["display", "redirectTolistScreen", "status"]);

  </script>