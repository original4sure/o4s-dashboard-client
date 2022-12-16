<template>
  <div v-if="!errorMessage" class="flex flex-col gap-4 px-6">
    <div>
      <O4SText oType="display-xs-normal" oLabel="E-Warranty" />
    </div>
    <div>
      <OButtonGroup v-model="selectedStatus" :options="options" />
    </div>
    <div class="h-full">
      <ODataTable
        :value="warrantyList"
        :lazy="true"
        :loading="listloading"
        :paginator="true"
        :rows="rowPerPage"
        :totalRecords="totalCount"
        @page="onPage($event)"
        @sort="onSort($event)"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[10, 15, 20]"
        :rowHover="true"
        v-model:selection="selectedWarranty"
        selectionMode="single"
        :scrollable="true"
        scrollHeight="calc(100vh - 214px)"
      >
        <template #empty class="text-center">
          <div>
            <O4SText
              oType="sm-normal"
              oLabel="No warranty requests found"
              class="o-secondary-900"
            />
          </div>
        </template>
        <OColumn field="customerName" header="Customer Details">
          <template #body="{ data }">
            <div class="flex flex-col">
              <O4SText
                oType="sm-normal"
                :oLabel="data.customerName"
                class="o-secondary-900"
              />
              <O4SText
                oType="sm-normal"
                :oLabel="data.mobileNumber"
                class="o-secondary-500"
              />
            </div>
          </template>
        </OColumn>
        <OColumn field="inVoiceNo" header="Invoice No">
          <template #body="{ data }">
            <O4SText
              oType="sm-normal"
              :oLabel="data.inVoiceNo"
              class="o-secondary-500"
            />
          </template>
        </OColumn>
        <OColumn field="sku" header="SKU">
          <template #body="{ data }">
            <div class="flex flex-col">
              <O4SText
                oType="sm-normal"
                :oLabel="data.sku.name"
                class="o-secondary-500"
              />
              <O4SText
                oType="sm-normal"
                :oLabel="data.sku.code"
                class="o-secondary-500"
              />
            </div>
          </template>
        </OColumn>
        <OColumn field="purchaseFrom" header="Purchased From">
          <template #body="{ data }">
            <O4SText
              oType="sm-normal"
              :oLabel="data.purchaseFrom"
              class="o-secondary-500"
            />
          </template>
        </OColumn>
        <OColumn field="purchasedOn" :sortable="true" header="Purchased On">
          <template #body="{ data }">
            <O4SText
              oType="sm-normal"
              :oLabel="data.purchasedOn"
              class="o-secondary-500"
            />
          </template>
        </OColumn>
        <OColumn field="lastUpdatedOn" header="Last Updated" :sortable="true">
          <template #body="{ data }">
            <O4SText
              oType="sm-normal"
              :oLabel="data.lastUpdatedOn"
              class="o-secondary-500"
            />
          </template>
        </OColumn>
        <OColumn field="status" header="Status" class="">
          <template #body="{ data }">
            <OTag
              v-if="data.status == 'Rejected'"
              :oLabel="data.status"
              severity="danger"
            />

            <OTag
              v-else-if="data.status == 'Approved'"
              :oLabel="data.status"
              severity="success"
            />

            <OTag v-else :oLabel="data.status" severity="warning" />
          </template>
        </OColumn>
      </ODataTable>
    </div>
  </div>
  <div v-else class="flex flex-col justify-center items-center">
    <img :src="oops" class="w-96"/>
    <O4SText oType="display-xs-normal" :oLabel="errorMessage" />
    <O4SText oType="sm-normal" oLabel="Please Try After Sometime" />
  </div>
</template>

<script src="./index.js"></script>
