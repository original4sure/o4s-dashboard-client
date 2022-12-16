import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";
import eWarrantyApi from "../../api/eWarranty";
import _ from "lodash";
import { DateTime } from "luxon";

//Store for warranty list
export const useEWarrantyListStore = defineStore("eWarrantyList", () => {
  //states
  let warrantyList = ref([]);
  let rowPerPage = ref(10);
  let totalCount = ref(0);
  let listloading = ref(false);
  let pageNumber = ref(0);
  let errorMessage = ref("")

  //computed properties
  let totalPages = computed(() =>
    Math.ceil(totalCount.value / rowPerPage.value)
  );

  //api function
  const fetchEWarrantyRequests = async function (
    status,
    sortByLastUpdated,
    sortByPurchased
  ) {
    listloading.value = true;

    const response = await eWarrantyApi.fetchEWarrantyList(
      rowPerPage.value,
      pageNumber.value,
      status,
      sortByLastUpdated,
      sortByPurchased
    );

    if(response.success){
      const result = response.data;
      warrantyList.value = result.list.map((item) => {
        return {
          customerName: item.userName,
          inVoiceNo: item.invoiceNumber,
          mobileNumber: item.userPhoneNumber,
          purchaseFrom: item.purchasedFrom,
          purchasedOn: DateTime.fromMillis(item.purchaseDate).toFormat(
            "LLL dd, yyyy"
          ),
          lastUpdatedOn: DateTime.fromMillis(item.lastUpdatedOn).toLocaleString(
            DateTime.DATETIME_MED
          ),
          status: _.capitalize(item.status),
          warrantyCode: item.warrantyCode,
          sku: item.sku,
        };
      });
      totalCount.value = result.totalCount;
      listloading.value = false;
    }else{
      console.log("L2",response)
      errorMessage.value = response.message
      console.log("L3 ", errorMessage.value)
    }
  };

  return {
    warrantyList,
    listloading,
    rowPerPage,
    totalPages,
    totalCount,
    pageNumber,
    errorMessage,
    fetchEWarrantyRequests,
  };
});

//Store for warranty form
export const useEWarrantyFromStore = defineStore("eWarrantyForm", () => {
  //states
  let basicDetailData = ref([]);
  let productDetailData = ref([]);
  let formLoaded = ref(false);
  let data = ref({});

  //api function
  const fetchWarranty = async function (payload) {
    formLoaded.value = false;
    const response = await eWarrantyApi.fetchWarranty(payload);
    data.value = response?.data?.data;

    const {
      sku,
      userName,
      purchasedFrom,
      purchaseDate,
      userPhoneNumber,
      activationRequestDate,
      productId,
      invoiceNumber,
      manufacturingDate,
      packagingLevel,
      serialNo,
      facilityName,
      batchId,
      ownership
    } = response?.data?.data || {};

    basicDetailData.value = [
      {
        label: "Mobile",
        value: userPhoneNumber ?? "NA",
      },
      {
        label: "Customer",
        value: userName ?? "NA",
      },
      {
        label: "SKU",
        value: sku?.name ?? "NA",
      },
      {
        label: "Purchased From",
        value: purchasedFrom ?? "NA",
      },
      {
        label: "Requested On",
        value: activationRequestDate
          ? DateTime.fromMillis(activationRequestDate).toFormat("dd LLL, yyyy")
          : "NA",
      },
      {
        label: "Purchased On",
        value: purchaseDate
          ? DateTime.fromMillis(purchaseDate).toFormat("dd LLL, yyyy")
          : "NA",
      },
      {
        label: "Invoice Number",
        value: invoiceNumber ?? "NA",
      },
    ];

    productDetailData.value = [
      {
        label: "Serial Number",
        value: serialNo ?? "NA",
      },
      {
        label: "Batch Number",
        value: batchId ?? "NA",
      },
      {
        label: "Product ID",
        value: productId ?? "NA",
      },
      {
        label: "Level",
        value: packagingLevel ?? "NA",
      },
      {
        label: "Manufacturing Plant",
        value: facilityName ?? "NA",
      },
      {
        label: "Manufacturing Date",
        value: manufacturingDate
          ? DateTime.fromMillis(manufacturingDate).toFormat("dd LLL, yyyy")
          : "NA",
      },
      {
        label: "Ownership",
        value: ownership?.owner?.name ?? "NA",
      },
    ];

    formLoaded.value = true;
  };

  return {
    basicDetailData,
    productDetailData,
    formLoaded,
    fetchWarranty,
    data,
  };
});
