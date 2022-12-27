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
    <div class="h-screen">
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
      />
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

let filterObject = computed(() => {
  return {
    purchasedOn: {
      startTimestamp: date.value ? getUnixTimeStamp(date.value[0]) : null,
      endTimestamp: date.value
        ? getUnixTimeStamp(date.value[1]) + 86400000
        : null,
    },
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
}

const props = defineProps(["display", "redirectTolistScreen", "status"]);
</script>
