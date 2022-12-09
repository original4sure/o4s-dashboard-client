import { defineStore } from 'pinia'
import { reactive, ref, computed } from 'vue'
import eWarrantyApi from '../api/eWarranty'

export const useEWarrantyStore = defineStore('eWarranty', () => {

  const state = reactive({
    list  : [
      {
          "customerName": "test-poc-spd_l3",
          "inVoiceNo": "KDJHF988S",
          "mobileNumber": "9988776655",
          "sku": {
              "code": "test-poc-spd_l2",
              "isActive": true,
              "name": "test-POC-SPD_L2",
              "packagingLevel": 2,
          },
          "purchaseFrom": "DN SUPERCOVER BRILLIANT WHITE 20L",
          "purchasedOn": "Jan 6, 2022",
          "lastUpdatedOn": "28th Nov 2022, 1:42 pm",
          "status": "approved"
      },
      {
          "customerName": "test-poc-spd_l3",
          "inVoiceNo": "KDJHF988S",
          "mobileNumber": "9988776655",
          "sku": {
              "code": "test-poc-spd_l2",
              "isActive": true,
              "name": "test-POC-SPD_L2",
              "packagingLevel": 2,
          },
          "purchaseFrom": "DN SUPERCOVER BRILLIANT WHITE 20L",
          "purchasedOn": "Jan 6, 2022",
          "lastUpdatedOn": "28th Nov 2022, 1:42 pm",
          "status": "pending"
      },
      {
          "customerName": "test-poc-spd_l3",
          "inVoiceNo": "KDJHF988S",
          "mobileNumber": "9988776655",
          "sku": {
              "code": "test-poc-spd_l2",
              "isActive": true,
              "name": "test-POC-SPD_L2",
              "packagingLevel": 2,
          },
          "purchaseFrom": "DN SUPERCOVER BRILLIANT WHITE 20L",
          "purchasedOn": "Jan 6, 2022",
          "lastUpdatedOn": "28th Nov 2022, 1:42 pm",
          "status": "rejected"
      },
      {
          "customerName": "test-poc-spd_l3",
          "inVoiceNo": "KDJHF988S",
          "mobileNumber": "9988776655",
          "sku": {
              "code": "test-poc-spd_l2",
              "isActive": true,
              "name": "test-POC-SPD_L2",
              "packagingLevel": 2,
          },
          "purchaseFrom": "DN SUPERCOVER BRILLIANT WHITE 20L",
          "purchasedOn": "Jan 6, 2022",
          "lastUpdatedOn": "28th Nov 2022, 1:42 pm",
          "status": "approved"
      },
      {
          "customerName": "test-poc-spd_l3",
          "inVoiceNo": "KDJHF988S",
          "mobileNumber": "9988776655",
          "sku": {
              "code": "test-poc-spd_l2",
              "isActive": true,
              "name": "test-POC-SPD_L2",
              "packagingLevel": 2,
          },
          "purchaseFrom": "DN SUPERCOVER BRILLIANT WHITE 20L",
          "purchasedOn": "Jan 6, 2022",
          "lastUpdatedOn": "28th Nov 2022, 1:42 pm",
          "status": "approved"
      }
    ]
  })

  const skus = computed(()=>{
    return state.list.map(sku =>{
      return {
        ...sku,
        date: "Jan 6, 2022",
        mrp: "200"
      }
    })
  })

  const fetchEWarrantyRequests = async function(){
    console.log('warranty list Api Called')
    const result = await eWarrantyApi.fetchEWarrantyList()
  }

  const fetchWarranty = async function(){
    console.log('warranty Api Called')
    await eWarrantyApi.fetchWarranty()
  }

  return { state, skus, fetchEWarrantyRequests, fetchWarranty }
})