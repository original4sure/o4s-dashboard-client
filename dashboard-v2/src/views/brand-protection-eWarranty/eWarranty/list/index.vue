<template>
  <div class="flex flex-col gap-4 px-6">
    <div>
      <O4SText oType="display-xs-normal" oLabel="E-Warranty" />
    </div>
    <div>
      <OButtonGroup v-model="selectedStatus" :options="options"/>
    </div>
    <div class="h-full">
      <ODataTable :value="warrantyList" :lazy="true" :loading="listloading" :paginator="true" :rows="rowPerPage" :totalRecords="totalCount" @page="onPage($event)" @sort="onSort($event)" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5, 10, 15]">
        <OColumn
          field="customerName"
          header="Customer Details"
        >
          <template #body="{ data }">
            <div>
              <O4SText
                oType="sm-normal"
                :oLabel="data.customerName"
                class="o-secondary-900"
              />
            </div>
            <div>
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
            <div>
              <O4SText
                oType="sm-normal"
                :oLabel="data.sku.name"
                class="o-secondary-500"
              />
            </div>
            <div>
              <O4SText
                oType="sm-normal"
                :oLabel="data.sku.code"
                class="o-secondary-500"
              />
            </div>
          </template>
        </OColumn>
        <OColumn
          field="purchaseFrom"
          header="Purchased From"
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
        >
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
            <div
              v-if="data.status == 'Rejected'"
              class="flex justify-center items-center py-0.5 px-2 badgeRejected"
            >
              <O4SText
                oType="sm-normal"
                :oLabel="data.status"
                class="o-error-700"
              />
            </div>

            <div
              v-else-if="data.status == 'Approved'"
              class="flex justify-center items-center py-0.5 px-2 badgeApproved"
            >
              <O4SText
                oType="sm-normal"
                :oLabel="data.status"
                class="o-success-700"
              />
            </div>

            <div
              v-else
              class="flex justify-center items-center py-0.5 px-2 badgePending"
            >
              <O4SText
                oType="sm-normal"
                :oLabel="data.status"
                class="o-warning-700"
              />
            </div>
          </template>
        </OColumn>
        <OColumn>
          <template #body="{ data }">
            <i
              class="pi pi-eye"
              @click="handleRequestDetails(data.warrantyCode)"
            />
          </template>
        </OColumn>
      </ODataTable>
      
    </div>
  </div>
</template>

<script src="./index.js"></script>
