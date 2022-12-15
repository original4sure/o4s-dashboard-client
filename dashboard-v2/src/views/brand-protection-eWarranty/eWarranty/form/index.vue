<template>
  <div v-if="formLoaded" class="flex flex-col gap-4 pb-10 px-6">
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

    <div
      v-if="data.status == 'PENDING'"
      class="header flex flex-row justify-between"
    >
      <div>
        <O4SText
          oType="lg-medium"
          oLabel="You can accept or reject the warranty based on the date provided by
          the customer"
        />
        <br />
        <O4SText
          oType="sm-normal"
          oLabel=" All the basic details and product details are listed below, review all
          the details before approving the e-warranty requests of a user."
        />
      </div>

      <div class="flex flex-row gap-x-4 gap-y-2">
        <OButton
          label="Reject"
          oType="outline"
          oColor="secondary"
          @click="() => changeStatus('rejected')"
        />
        <OButton
          label="Approve"
          oType="primary"
          @click="() => changeStatus('approved')"
        />
      </div>
    </div>

    <ODivider />

    <div class="flex flex-col gap-6">
      <div class="flex flex-row justify-between items-center">
        <div>Basic Details</div>
        <div>
          <OButton
            label="Preview Invoice"
            oType="primary"
            @click="openLinkInNewTab(data.invoiceLink)"
          />
        </div>
      </div>

      <div class="wraper gap-x-8 gap-y-2">
        <div
          class="checkbox-item"
          v-for="{ value, label } in basicDetailData"
          :key="label"
        >
          <O4SInputText
            :oLabel="label"
            :value="value"
            :disabled="true"
            oRightIcon="pi pi-question-circle"
          />
        </div>
      </div>
    </div>

    <ODivider />

    <div class="flex flex-col gap-6">
      <div>Product Details</div>
      <div class="wraper gap-x-8 gap-y-2">
        <div
          class="checkbox-item"
          v-for="{ value, label } in productDetailData"
          :key="label"
        >
          <O4SInputText
            :oLabel="label"
            :value="value"
            :disabled="true"
            oRightIcon="pi pi-question-circle"
          />
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="loader-screen h-96 flex flex-col gap-4 justify-center items-center"
  >
    <div class="lds-dual-ring"></div>
    <div><O4SText oType="md-normal" oLabel="Fetching Warranty Details" /></div>
  </div>
  <FormDialog
    :display="display"
    :status="status"
    :redirectTolistScreen="redirectTolistScreen"
  />
</template>

<script src="./index.js" />
