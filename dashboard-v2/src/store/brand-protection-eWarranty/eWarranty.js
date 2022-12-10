import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";
import eWarrantyApi from "../../api/eWarranty";
import _ from "lodash"

export const useEWarrantyStore = defineStore("eWarranty", () => {
  let warrantyList = ref([]);

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


  const fetchEWarrantyRequests = async function () {
    console.log("warranty list Api Called");
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

    console.log(warrantyList);

    warrantyList.value = result.list.map((item) => {
      return {
        ...item,
        customerName: "John Doe",
        inVoiceNo: "KDJHF988S",
        mobileNumber: item.userPhoneNumber,
        purchaseFrom: "DN SUPERCOVER BRILLIANT WHITE 20L",
        purchasedOn: item.purchaseDate,
        lastUpdatedOn: 1670284800000,
        status: _.capitalize(item.status),
      };
    });

    console.log(warrantyList);
  };

  const fetchWarranty = async function (payload) {
    const response = await eWarrantyApi.fetchWarranty(payload);

    console.log("response", response)
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


    console.log(result)
  };

  return { warrantyList, basicDetailData, productDetailData, fetchEWarrantyRequests, fetchWarranty };
});



