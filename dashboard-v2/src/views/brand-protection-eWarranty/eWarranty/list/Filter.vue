<template>
  <ODialog
    :visible="display"
    @input="$emit('update:visible', $event.target.value)"
    header="Filters"
    :draggable="false"
    :modal="true"
    style="width: auto"
    position="right"
    :style="{ width: '25vw', height: '100vh' }"
    dismissableMask
  >
    <div class="h-screen flex flex-col gap-3">
      <O4SDropdown
        oLabel="Status"
        v-model="status"
        :options="options"
        optionLabel="label"
        placeholder="Select a Status"
      />
      <O4SInputCalendar
        oLabel="Purchased On"
        v-model="date"
        selectionMode="range"
        dateFormat="dd.mm.yy"
        showOtherMonths
        :showIcon="true"
        :showOnFocus="false"
        placeholder="Enter Purchased On"
      />
      <O4SInputSearch
        oLabel="Invoice No"
        v-model="invoiceNumber"
        placeholder="Enter Invoice Number"
      />
      <div>
        <ODivider />
        <O4SText
          oType="sm-normal"
          oLabel="Total Filter Selected: "
          class="o-secondary-700"
        />
        <O4SText
          oType="sm-normal"
          :oLabel="totalFilters"
          class="o-secondary-700 o-bg-secondary-100 px-1 rounded"
        />
      </div>
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

<style lang="scss" scope>
.p-dialog-mask {
  align-items: stretch;
}

.p-dialog-right .p-dialog {
  margin: 0;
  max-height: unset;
}

.p-dialog-right {
  flex-direction: row;
}

@keyframes p-component-overlay-enter-animation {
  100% {
    background-color: unset;
  }
}

.p-calendar {
  .p-button.p-button-icon-only {
    padding: 11px 14px;
    border-top: 1px solid var(--secondary-300);
    border-right: 1px solid var(--secondary-300);
    border-bottom: 1px solid var(--secondary-300);

    border-radius: 0 var(--round) var(--round) 0;
    &:enabled:hover {
      background: var(--primary-500);
      color: #fff;
      border: 1px solid var(--secondary-300);
    }
  }

  .p-button:focus {
    box-shadow: unset;
  }

  input.p-inputtext {
    border-right: unset;
  }

  input.p-inputtext:enabled:hover {
    box-shadow: unset;
    border-right: unset;
  }
  input.p-inputtext:enabled:focus {
    box-shadow: unset;
    border-right: unset;
  }
}
</style>

<script setup>
import { computed, ref } from "vue";
import { getUnixTimeStamp } from "@/utils/dateTime";

let status = ref(null);
let date = ref(null);
let invoiceNumber = ref(null);

let totalFilters = computed(() => {
  let count = 0;
  if (status.value) {
    count += 1;
  }
  if (date.value) {
    count += 1;
  }
  if (invoiceNumber.value) {
    count += 1;
  }

  return count.toString();
});

let filterObject = computed(() => {
  return {
    purchasedOn: {
      startTimestamp: date.value ? getUnixTimeStamp(date.value[0]) : null,
      endTimestamp: date.value
        ? getUnixTimeStamp(date.value[1]) + 86400000
        : null,
    },
    invoice: invoiceNumber.value ? invoiceNumber.value : null,
    status: status.value ? status.value.value : null,
  };
});

let options = [
  { value: "APPROVED", label: "Approved" },
  { value: "PENDING", label: "Pending" },
  { value: "REJECTED", label: "Rejected" },
];

function resetFilter() {
  date.value = null;
  status.value = null;
  invoiceNumber.value = null;
}

const props = defineProps(["display", "redirectTolistScreen", "status"]);
</script>
