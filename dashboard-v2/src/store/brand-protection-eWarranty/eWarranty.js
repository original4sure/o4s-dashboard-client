import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";
import eWarrantyApi from "../../api/eWarranty";
import _ from "lodash"


//Store for warranty list
export const useEWarrantyListStore = defineStore("eWarrantyList", () => {

  //states
  let warrantyList = ref([]);
  let rowPerPage = ref(10);
  let totalCount = ref(0);

  //computed properties
  let totalPages = computed(()=> Math.ceil(totalCount.value/rowPerPage.value));

  //utility function
  const dateFormatter = function(date){
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const d = new Date(date);

    let day = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return month + ' ' + day + ', ' + year

  }

  const timeFormatter = function(date){
    const d = new Date(date);

    let hour = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();

    //adding leading zero for hour less than 10
    hour = hour.toString().length < 2 ? '0' + hour.toString() : hour.toString()

    //getting am or pm
    let amPm = d.getHours() > 12 ? 'pm' : 'am'

    return hour + ':' + d.getMinutes() + ' ' + amPm

  }

  //api function
  const fetchEWarrantyRequests = async function () {
    // const result = await eWarrantyApi.fetchEWarrantyList()
    const result = {
      hasMore: true,
      length: 3,
      list: [
        {
          activationRequestDate: null,
          companyCode: "NovaDesiGhee",
          manufacturingDate: 1670284800000,
          productId: 32264615275,
          purchaseDate: 1670284800000,
          status: "REJECTED",
          userEmail: null,
          userPhoneNumber: "+918878999100",
          warrantyCode: "F80F3435",
          warrantyEndDate: 1670284800000,
          sku: {
            code: "test-poc-spd_l2",
            isActive: true,
            name: "test-POC-SPD_L2",
            packagingLevel: 2,
          },
        },
        {
          activationRequestDate: null,
          companyCode: "NovaDesiGhee",
          manufacturingDate: 1670284800000,
          productId: 62533493107,
          purchaseDate: 1670284800000,
          status: "APPROVED",
          userEmail: null,
          userPhoneNumber: "+918878999100",
          warrantyCode: "B5A5074B",
          warrantyEndDate: 1670284800000,
          sku: {
            code: "test-poc-spd_l2",
            isActive: true,
            name: "test-POC-SPD_L2",
            packagingLevel: 2,
          },
        },
        {
          activationRequestDate: null,
          companyCode: "NovaDesiGhee",
          manufacturingDate: 1670284800000,
          productId: 29653796565,
          purchaseDate: 1670284800000,
          status: "PENDING",
          userEmail: null,
          userPhoneNumber: "+918878999100",
          warrantyCode: "45F8CBA5",
          warrantyEndDate: 1670284800000,
          sku: {
            code: "test-poc-spd_l2",
            isActive: true,
            name: "test-POC-SPD_L2",
            packagingLevel: 2,
          },
        },
      ],
      nextPage: 2,
      totalCount: 3,
    };

    warrantyList.value = result.list.map((item) => {
      return {
        ...item,
        customerName: "John Doe",
        inVoiceNo: "KDJHF988S",
        mobileNumber: item.userPhoneNumber,
        purchaseFrom: "DN SUPERCOVER BRILLIANT WHITE 20L",
        purchasedOn: dateFormatter(item.purchaseDate),
        lastUpdatedOn: dateFormatter(1670284800000) + ' ' + timeFormatter(1670284800000),
        status: _.capitalize(item.status),
      };
    });

    totalCount.value = result.totalCount

    console.log(totalPages.value, totalCount.value)
  };

  return { warrantyList, rowPerPage, totalPages, fetchEWarrantyRequests };
});


//Store for warranty form
export const useEWarrantyFromStore = defineStore("eWarrantyForm", ()=>{

  //states
  let basicDetailData = ref([
    {
      label: "Mobile",
      value: "Text",
    },
    {
      label: "Customer",
      value: "Text",
    },
    {
      label: "SKU",
      value: "Text",
    },
    {
      label: "Purchased From",
      value: "Text",
    },
    {
      label: "Requested On",
      value: "Text",
    },
    {
      label: "Purchased On",
      value: "Text",
    },
    {
      label: "Invoice Number",
      value: "Text",
    },
  ]);

  let productDetailData = ref([
    {
      label: "Serial Number",
      value: "Text",
    },
    {
      label: "Batch Number",
      value: "Text",
    },
    {
      label: "Product ID",
      value: "Text",
    },
    {
      label: "Level",
      value: "Text",
    },
    {
      label: "Manufacturing Plant",
      value: "Text",
    },
    {
      label: "Manufacturing Date",
      value: "Text",
    },
    {
      label: "Ownership",
      value: "Text",
    },
  ]);

  //api function
  const fetchWarranty = async function (payload) {
    const response = await eWarrantyApi.fetchWarranty(payload);

    let result = response.data.data

    basicDetailData.value = [
      {
        label: "Mobile",
        value: result.user.phoneNumber,
      },
      {
        label: "Customer",
        value: result.warrantyData.name,
      },
      {
        label: "SKU",
        value: result.sku.name,
      },
      {
        label: "Purchased From",
        value: result.warrantyData.purchasedFrom,
      },
      {
        label: "Requested On",
        value: result.activationRequestDate,
      },
      {
        label: "Purchased On",
        value: result.warrantyData.purchasedOn,
      },
      {
        label: "Invoice Number",
        value: result.warrantyData.invoice,
      },
    ]

    productDetailData.value = [
      {
        label: "Serial Number",
        value: "Text",
      },
      {
        label: "Batch Number",
        value: "Text",
      },
      {
        label: "Product ID",
        value: result.productId,
      },
      {
        label: "Level",
        value: "Text",
      },
      {
        label: "Manufacturing Plant",
        value: "Text",
      },
      {
        label: "Manufacturing Date",
        value: "Text",
      },
      {
        label: "Ownership",
        value: "Text",
      },
    ]

  };

  return { basicDetailData, productDetailData, fetchWarranty }
});



