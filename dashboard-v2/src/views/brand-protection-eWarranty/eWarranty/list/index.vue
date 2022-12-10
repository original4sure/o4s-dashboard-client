<template>
  <div class="flex flex-col gap-4 px-8">
    <div>
      <O4SText oType="display-xs-normal" oLabel="E-Warranty" />
    </div>
    <div class="px-4 h-full">
      <ODataTable :value="warrantyList" :paginator="true" :rows="10">
        <OColumn
          field="customerName"
          :sortable="true"
          header="Customer Details"
        >
          <template #body="{ data }">
            <div>
              <O4SText oType="md-normal" :oLabel="data.customerName" />
            </div>
            <div>
              <O4SText oType="md-normal" :oLabel="data.mobileNumber" />
            </div>
          </template>
        </OColumn>
        <OColumn
          field="inVoiceNo"
          header="Invoice No"
          :sortable="true"
        ></OColumn>
        <OColumn field="sku" header="SKU">
          <template #body="{ data }">
            <div>
              {{ data.sku.name }}
            </div>
            <div>
              {{ data.sku.code }}
            </div>
          </template>
        </OColumn>
        <OColumn
          field="purchaseFrom"
          :sortable="true"
          header="Purchase From"
          class=""
        ></OColumn>
        <OColumn
          field="purchasedOn"
          :sortable="true"
          header="Purchase On"
          class=""
        ></OColumn>
        <OColumn
          field="lastUpdatedOn"
          header="Last Updated"
          class=""
        ></OColumn>
        <OColumn field="status" header="Status" class="">
          <template #body="{ data }">
            <div
              class="flex justify-center items-center py-0.5 px-2"
              :class="{
                badgeApproved: data.status === 'Approved',
                badgeRejected: data.status === 'Rejected',
                badgePending: data.status === 'Pending',
              }"
            >
              {{ data.status }}
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
