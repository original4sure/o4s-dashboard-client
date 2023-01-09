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
      <div>
        <OButton
          label="upload"
          oType="secondary"
          oColor="primary"
          @click="handleJobType('upload')"
        />
        <OButton
          label="download"
          oType="secondary"
          oColor="primary"
          @click="handleJobType('download')"
        />
      </div>
      <div v-for="data in list" :key="data.key">
        <Card :type="selectJobType" :data="data" />
      </div>
    </div>
  </ODialog>
</template>

<script src="./index.js" />
