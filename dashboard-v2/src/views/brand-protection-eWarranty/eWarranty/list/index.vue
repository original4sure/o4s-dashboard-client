<template>
  <div class="flex flex-col gap-4 px-8">
    <div>
      <O4SText oType="display-xs-normal" oLabel="E-Warranty" />
    </div>
    <div class="px-4 h-full">
      <ODataTable :value="warrantyList" :paginator="true" :rows="rowPerPage">
        <OColumn
          field="customerName"
          :sortable="true"
          header="Customer Details"
        >
          <template #body="{ data }">
            <div>
              <O4SText oType="sm-normal" :oLabel="data.customerName" class="o-secondary-500"/>
            </div>
            <div>
              <O4SText oType="sm-normal" :oLabel="data.mobileNumber" class="o-secondary-500" />
            </div>
          </template>
        </OColumn>
        <OColumn
          field="inVoiceNo"
          header="Invoice No"
          :sortable="true"
        >
        <template #body="{ data }">
          <O4SText oType="sm-normal" :oLabel="data.inVoiceNo" class="o-secondary-500"/>
        </template>
        </OColumn>
        <OColumn field="sku" header="SKU">
          <template #body="{ data }">
            <div>
              <O4SText oType="sm-normal" :oLabel="data.sku.name" class="o-secondary-500"/>
            </div>
            <div>
              <O4SText oType="sm-normal" :oLabel="data.sku.code" class="o-secondary-500"/>
            </div>
          </template>
        </OColumn>
        <OColumn
          field="purchaseFrom"
          :sortable="true"
          header="Purchase From"
          class=""
        >
          <template #body="{ data }">
            <O4SText oType="sm-normal" :oLabel="data.purchaseFrom" class="o-secondary-500"/>
          </template>
        </OColumn>
        <OColumn
          field="purchasedOn"
          :sortable="true"
          header="Purchase On"
          class=""
        >
          <template #body="{ data }">
            <O4SText oType="sm-normal" :oLabel="data.purchasedOn" class="o-secondary-500"/>
          </template>
        </OColumn>
        <OColumn
          field="lastUpdatedOn"
          header="Last Updated"
          class=""
        >
          <template #body="{ data }">
            <O4SText oType="sm-normal" :oLabel="data.lastUpdatedOn" class="o-secondary-500"/>
          </template>
        </OColumn>
        <OColumn field="status" header="Status" class="">
          <template #body="{ data }">
            <div v-if="data.status == 'Rejected'" class="flex justify-center items-center py-0.5 px-2 badgeRejected">
              <O4SText oType="sm-normal" :oLabel="data.status" class="o-error-700"/>
            </div>

            <div v-else-if="data.status == 'Approved'" class="flex justify-center items-center py-0.5 px-2 badgeApproved">
              <O4SText oType="sm-normal" :oLabel="data.status" class="o-success-700"/>
            </div>

            <div v-else class="flex justify-center items-center py-0.5 px-2 badgePending">
              <O4SText oType="sm-normal" :oLabel="data.status" class="o-warning-700"/>
            </div>
          </template>
        </OColumn>
        <OColumn>
          <template #body="{data}">
            <i class="pi pi-eye" @click="handleRequestDetails(data.warrantyCode)" />
          </template>
        </OColumn>
      </ODataTable>
    </div>
  </div>
</template>

<script src="./index.js"></script>
