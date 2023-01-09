<template>
  <ODialog
    :visible="display"
    :draggable="false"
    :modal="true"
    style="width: auto"
    position="right"
    :style="{ width: '25vw', height: '100vh' }"
    closeIcon=""
    dismissableMask
    >
    <div class="h-screen flex flex-col gap-3">
      <Card type="download" />
    </div>
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

</style>

<script src="./index.js" />
