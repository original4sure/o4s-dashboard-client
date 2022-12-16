<template>
  <img src="../../assets/loader.gif" :style="currentStyle" />
</template>

<script setup>
const props = defineProps(["style"]);
const currentStyle = props.style ? props.style : "width:10rem";
</script>
