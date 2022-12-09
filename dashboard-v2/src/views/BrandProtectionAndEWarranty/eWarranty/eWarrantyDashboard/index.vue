<template>
    <div class="flex flex-col gap-4 px-8">
        <div>
            <O4SText oType="display-xs-normal" oLabel="E-Warranty"/>
        </div>
        <div class="px-4 h-full">
        <ODataTable :value="skus" :paginator="true" :rows="10">
            <OColumn field="customerName" :sortable="true" header="Customer Details">
                <template #body="{data}">
                    <div>
                        {{data.customerName}}
                    </div>
                    <div>
                        {{data.mobileNumber}}
                    </div>
                </template>
            </OColumn>
            <OColumn field="inVoiceNo" header="Invoice No" :sortable="true"></OColumn>
            <OColumn field="sku" header="SKU">
                <template #body="{data}">
                    <div>
                        {{data.sku.name}}
                    </div>
                    <div>
                        {{data.sku.code}}
                    </div>
                </template>
            </OColumn>
            <OColumn field="purchaseFrom" :sortable="true" header="Purchase From" class="w-48"></OColumn>
            <OColumn field="purchasedOn" :sortable="true" header="Purchase On" class="w-48"></OColumn>
            <OColumn field="lastUpdatedOn" :sortable="true" header="Last Updated" class="w-48"></OColumn>
            <OColumn field="status" header="Status" :sortable="true" class="w-48">
                <template #body="{data}">
                    <div class="flex justify-center items-center py-0.5 px-2" :class="{ badgeApproved: data.status === 'approved', badgeRejected: data.status === 'rejected', badgePending: data.status === 'pending'}">
                        {{data.status}}
                    </div>
                </template>
            </OColumn>
            <OColumn>
                <template #body>
                    <i class="pi pi-eye" @click="handleRequestDetails"/>
                </template>
            </OColumn>
        </ODataTable>
        </div>
    </div>
</template>

<script setup>
   import { onMounted } from 'vue'
   import { useRouter } from 'vue-router';
   import { useEWarrantyStore } from '@/store/eWarranty'

   const router = useRouter()
   const store = useEWarrantyStore()
   const skus = store.skus

   

   function handleRequestDetails(){
    router.push('/BrandProtectionAndEWarranty/eWarranty/eWarrantyForm')
   }
   
   onMounted(() => {
    store.fetchWarranty()
    store.fetchEWarrantyRequests()
   })
</script> 

<style lang="scss">

  .badgeApproved{
    background: #ECFDF3;
    color: #027A48;
    border-radius: 1rem;
  }

  .badgeRejected{
    background: #FEF3F2;
    color: #B42318;
    border-radius: 1rem;
  }

  .badgePending{
    background: #FFFAEB;
    color:#B54708;
    border-radius: 1rem;
  }
  </style>