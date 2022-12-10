import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";
import eWarrantyApi from "../../api/eWarranty";
import _ from "lodash"

export const useEWarrantyStore = defineStore("eWarranty", () => {
  let warrantyList = ref([]);

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

  const fetchWarranty = async function () {
    await eWarrantyApi.fetchWarranty();
  };

  return { warrantyList, fetchEWarrantyRequests, fetchWarranty };
});
