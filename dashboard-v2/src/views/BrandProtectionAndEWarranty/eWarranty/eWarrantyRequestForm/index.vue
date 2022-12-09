<template>
    <div class="flex flex-col gap-4 px-8">
        <div class="flex flex-row gap-4 items-center">
            <OButton icon="pi pi-arrow-left" oType="outline" oColor="secondary" @click="()=>{this.$router.push('/BrandProtectionAndEWarranty/eWarranty/eWarrantyDashboard')}"/>
            <div>
                <O4SText oType="display-xs-normal" oLabel="Jhon Doe"/>
            </div>
        </div>
        
        <div class="header flex flex-row justify-between">
            <div>
                <div>
                    You can accept or reject the warranty based on the date provided by the customer
                </div>
                <div>
                    All the basic details and product details are listed below, review all the details before approving the e-warranty requests of a user.
                </div>
            </div>
            <div class="flex flex-row gap-4">
                <OButton label="Reject" oType="secondary" />
                <OButton label="Approve" oType="primary" />
            </div>
        </div>
        <ODivider/>
        <div class="flex flex-col gap-8">
            <div class="flex flex-row justify-between items-center">
                <div>Basic Details</div>
                <div><OButton label="Preview Invoice" oType="primary" /></div>
            </div>
            <div class="basicDetails gap-8">
                <div>Mobile <O4SInputText :disabled="true" oRightIcon="pi pi-question-circle"/></div>
                <div>Customer <O4SInputText :disabled="true" oRightIcon="pi pi-question-circle"/></div>
                <div>SKU <O4SInputText :disabled="true" oRightIcon="pi pi-question-circle"/></div>
                <div>Purchased From <O4SInputText :disabled="true" oRightIcon="pi pi-question-circle"/></div>
                <div>Requested On <O4SInputText :disabled="true" oRightIcon="pi pi-question-circle"/></div>
                <div>Purchased On <O4SInputText :disabled="true" oRightIcon="pi pi-question-circle"/></div>
                <div>Invoice Number <O4SInputText :disabled="true" oRightIcon="pi pi-question-circle"/></div>
            </div>
        </div>
        <ODivider/>
        <div class="flex flex-col gap-8">
            <div>Product Details</div>
            <div class="productDetails gap-8">
                <div>Serial Number <O4SInputText :disabled="true" oRightIcon="pi pi-question-circle"/></div>
                <div>Batch Number <O4SInputText :disabled="true" oRightIcon="pi pi-question-circle"/></div>
                <div>Product ID <O4SInputText :disabled="true" oRightIcon="pi pi-question-circle"/></div>
                <div>Level <O4SInputText :disabled="true" oRightIcon="pi pi-question-circle"/></div>
                <div>Manufacturing Plant <O4SInputText :disabled="true" oRightIcon="pi pi-question-circle"/></div>
                <div>Manufacturing Date <O4SInputText :disabled="true" oRightIcon="pi pi-question-circle"/></div>
                <div>Ownership <O4SInputText :disabled="true" oRightIcon="pi pi-question-circle"/></div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
// variable
// functions
function log() {
console.log(msg)
}
</script>

<style lang="scss">
.basicDetails{
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.productDetails{
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
}
</style>