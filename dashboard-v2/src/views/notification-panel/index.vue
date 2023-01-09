<template>
  <ODialog
    header="Notifications"
    :visible="display"
    :draggable="false"
    :modal="true"
    style="width: auto"
    position="right"
    :style="{ width: '25vw', height: '100vh' }"
    dismissableMask
  >
    <div class="h-screen flex flex-col gap-3">
      <Card type="download" />
    </div>
  </ODialog>
</template>

<script src="./index.js" />
