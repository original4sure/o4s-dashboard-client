import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";
import eWarrantyApi from "../../api/eWarranty";
import _ from "lodash";
import { DateTime } from "luxon";

//Store for warranty list
export const useEWarrantyListStore = defineStore("eWarrantyList", () => {
  //states
  let warrantyList = ref([]);
  let rowPerPage = ref(5);
  let totalCount = ref(0);
  let listloading = ref(false);
  let pageNumber = ref(0);

  //computed properties
  let totalPages = computed(() =>
    Math.ceil(totalCount.value / rowPerPage.value)
  );

  //api function
  const fetchEWarrantyRequests = async function (status, sortByLastUpdated, sortByPurchased) {
    listloading.value = true;

    const response = await eWarrantyApi.fetchEWarrantyList(
      rowPerPage.value,
      pageNumber.value,
      status,
      sortByLastUpdated,
      sortByPurchased
    );

    const result = response.data.data;

    warrantyList.value = result.list.map((item) => {
      return {
        customerName: item.userName,
        inVoiceNo: item.invoiceNumber,
        mobileNumber: item.userPhoneNumber,
        purchaseFrom: item.purchasedFrom,
        purchasedOn: DateTime.fromMillis(item.purchaseDate).toFormat('LLL dd, yyyy'),
        lastUpdatedOn: DateTime.fromMillis(item.lastUpdatedOn).toLocaleString(DateTime.DATETIME_MED),
        status: _.capitalize(item.status),
        warrantyCode: item.warrantyCode,
        sku: item.sku
      };
    });
    totalCount.value = result.totalCount;
    listloading.value = false;
  };

  return {
    warrantyList,
    listloading,
    rowPerPage,
    totalPages,
    totalCount,
    pageNumber,
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
      invoiceLink,
      manufacturingDate,
      productDetails: {
        packagingLevel,
        serialNo,
        facilityName,
        batchId,
        ownership: {
          owner
        }
      }
    } = response?.data?.data || {};

    basicDetailData.value = [
      {
        label: "Mobile",
        value: userPhoneNumber,
      },
      {
        label: "Customer",
        value: userName,
      },
      {
        label: "SKU",
        value: sku?.name,
      },
      {
        label: "Purchased From",
        value: purchasedFrom,
      },
      {
        label: "Requested On",
        value: DateTime.fromMillis(activationRequestDate).toFormat('dd LLL, yyyy') ,
      },
      {
        label: "Purchased On",
        value: DateTime.fromMillis(purchaseDate).toFormat('dd LLL, yyyy'),
      },
      {
        label: "Invoice Number",
        value: invoiceNumber,
      },
    ];

    productDetailData.value = [
      {
        label: "Serial Number",
        value: serialNo,
      },
      {
        label: "Batch Number",
        value: batchId,
      },
      {
        label: "Product ID",
        value: productId,
      },
      {
        label: "Level",
        value: packagingLevel,
      },
      {
        label: "Manufacturing Plant",
        value: facilityName,
      },
      {
        label: "Manufacturing Date",
        value: manufacturingDate ? DateTime.fromMillis(manufacturingDate).toFormat('dd LLL, yyyy') : 'NA',
      },
      {
        label: "Ownership",
        value: owner.name,
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
