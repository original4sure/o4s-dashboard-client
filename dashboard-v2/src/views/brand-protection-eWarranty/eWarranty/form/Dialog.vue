<template>
  <div>
    <ODialog
      v-model:visible="display"
      header=" "
      :closable="false"
      :draggable="false"
    >
      <div class="grid justify-center">
        <O4SText :oLabel="`E-warranty has been ${status}!`" oType="lg-medium" />
        <br />
        <OButton
          :oColor="`${status == 'approved' ? 'primary' : 'error'}`"
          class="mt-1"
          label="Back to E-Warranty Table"
          @click="redirectTolistScreen"
        />
      </div>
    </ODialog>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["display", "redirectTolistScreen", "status"]);
const display = computed(() => props.display);
const status = computed(() => props.status);
const redirectTolistScreen = computed(() => props.redirectTolistScreen);
</script>
