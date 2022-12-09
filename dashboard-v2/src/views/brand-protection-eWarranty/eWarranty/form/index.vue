<template>
  <div class="flex flex-col gap-4 px-8">
    <div class="flex flex-row gap-4 items-center">
      <OButton
        icon="pi pi-arrow-left"
        oType="outline"
        oColor="secondary"
        @click="redirectTolistScreen"
      />
      <div>
        <O4SText oType="display-xs-normal" oLabel="Jhon Doe" />
      </div>
    </div>

    <div class="header flex flex-row justify-between">
      <div>
        <div>
          You can accept or reject the warranty based on the date provided by
          the customer
        </div>
        <div>
          All the basic details and product details are listed below, review all
          the details before approving the e-warranty requests of a user.
        </div>
      </div>

      <div class="flex flex-row gap-4">
        <OButton label="Reject" oType="secondary" />
        <OButton label="Approve" oType="primary" />
      </div>
    </div>

    <ODivider />

    <div class="flex flex-col gap-8">
      <div class="flex flex-row justify-between items-center">
        <div>Basic Details</div>
        <div><OButton label="Preview Invoice" oType="primary" /></div>
      </div>

      <div class="wraper gap-8">
        <div
          class="checkbox-item"
          v-for="{ value, label } in basicDetailData"
          :key="label"
        >
          <O4SInputText
            oLabel="label"
            :value="value"
            :disabled="true"
            oRightIcon="pi pi-question-circle"
          />
        </div>
      </div>
    </div>

    <ODivider />

    <div class="flex flex-col gap-8">
      <div>Product Details</div>
      <div class="wraper gap-8">
        <div
          class="checkbox-item"
          v-for="{ value, label } in productDetailData"
          :key="label"
        >
          <O4SInputText
            oLabel="label"
            :value="value"
            :disabled="true"
            oRightIcon="pi pi-question-circle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.js" />
