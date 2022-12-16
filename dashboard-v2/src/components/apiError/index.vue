<template>
  <div class="flex flex-col justify-center items-center">
    <img src="../../assets/oops.gif" style="currentStyle" />
    <O4SText
      oType="display-xs-normal"
      :oLabel="props.errorMessage"
      class="o-error-500"
    />
    <O4SText
      oType="sm-normal"
      oLabel="Please Try After Sometime"
      class="o-error-500"
    />
  </div>
</template>

<script setup>
const props = defineProps(["style", "errorMessage"]);
const currentStyle = props.style ? props.style : "width: 24rem";
</script>
