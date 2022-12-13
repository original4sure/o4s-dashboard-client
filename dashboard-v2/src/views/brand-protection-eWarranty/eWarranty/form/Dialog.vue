<template>
  <div>
    <OButton label="Show Dialog" @click="openBasic" />
    <ODialog v-model:visible="display" header=" ">
      <div>
        <O4SText oLabel="E-warranty has been approved!" oType="lg-medium" />
        <br />
        <OButton class="mt-1" label="Back to E-Warranty Table" @click="" />
      </div>
    </ODialog>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  name: "FormDialog",
  setup() {
    const display = ref(false);

    const openBasic = () => {
      display.value = true;
    };

    return { openBasic, display };
  },
};
</script>
