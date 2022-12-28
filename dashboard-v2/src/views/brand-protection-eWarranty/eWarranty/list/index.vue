<template>
  <div v-if="!errorMessage" class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <div class="w-2/4">
        <O4SText oType="display-xs-normal" oLabel="E-Warranty" />
      </div>
      <div class="flex items-center justify-end gap-5 w-2/4">
        <O4SInputSearch
          :value="searchKeywords"
          @input="onSearch($event)"
          oRightIcon="pi pi-search"
          placeholder="Search via phone no or unique Id"
          class="w-2/3"
        />
        <OButton
          label="Filter"
          oType="secondary"
          oColor="primary"
          icon="pi pi-filter"
          @click="handleFilter"
        />
      </div>
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
        <template #empty v-if="!listloading">
          <O4SText
            oType="sm-normal"
            oLabel="No warranty requests found"
            class="o-secondary-900 empty-message"
          />
        </template>
        <template #loading>
          <Loader />
        </template>
        <OColumn
          field="customerName"
          header="Customer Details"
          style="flex: 0 0 15%"
        >
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
        <OColumn field="inVoiceNo" header="Invoice No" style="flex: 0 0 10%">
          <template #body="{ data }">
            <O4SText
              oType="sm-normal"
              :oLabel="data.inVoiceNo"
              class="o-secondary-500"
            />
          </template>
        </OColumn>
        <OColumn field="sku" header="SKU" style="flex: 0 0 27%">
          <template #body="{ data }">
            <div class="flex flex-col gap-2">
              <div class="flex gap-1">
                <O4SText
                  oType="sm-normal"
                  :oLabel="'SKU: '"
                  class="o-secondary-700 o-bg-secondary-100 px-1 rounded"
                />
                <O4SText
                  oType="sm-normal"
                  :oLabel="data.sku.code"
                  class="o-secondary-500"
                />
              </div>
              <div class="flex gap-1">
                <O4SText
                  oType="sm-normal"
                  :oLabel="'SKU Name: '"
                  class="o-secondary-700 o-bg-secondary-100 px-1 rounded"
                />
                <O4SText
                  oType="sm-normal"
                  :oLabel="data.sku.name"
                  class="o-secondary-700"
                />
              </div>
              <div class="flex gap-1">
                <O4SText
                  oType="sm-normal"
                  :oLabel="'UID: '"
                  class="o-secondary-700 o-bg-secondary-100 px-1 rounded"
                />
                <O4SText
                  oType="sm-normal"
                  :oLabel="data.productId"
                  class="o-secondary-500"
                />
              </div>
            </div>
          </template>
        </OColumn>
        <OColumn
          field="purchaseFrom"
          header="Purchased From"
          style="flex: 0 0 16%"
        >
          <template #body="{ data }">
            <O4SText
              oType="sm-normal"
              :oLabel="data.purchaseFrom"
              class="o-secondary-500"
            />
          </template>
        </OColumn>
        <OColumn
          field="purchasedOn"
          :sortable="true"
          header="Purchased On"
          style="flex: 0 0 16%"
        >
          <template #body="{ data }">
            <O4SText
              oType="sm-normal"
              :oLabel="data.purchasedOn"
              class="o-secondary-500"
            />
          </template>
        </OColumn>
        <OColumn
          field="status"
          header="Status"
          headerStyle="justify-content: center;"
          bodyStyle="justify-content: center; text-align: center"
          style="flex: 0 0 16%"
        >
          <template #body="{ data }">
            <div class="flex flex-col">
              <div>
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
                <OTag v-else oLabel="Pending" severity="warning" />
              </div>

              <div v-tooltip.bottom="'Last Updated On'">
                <O4SText
                  oType="xs-normal"
                  :oLabel="data.lastUpdatedOn"
                  class="o-secondary-500"
                />
              </div>
            </div>
          </template>
        </OColumn>
      </ODataTable>
    </div>
    <Filter @applyFilter="applyFilter" v-model:visible="showFilter" />
  </div>
  <ApiError v-else :errorMessage="errorMessage" />
</template>

<script src="./index.js"></script>
