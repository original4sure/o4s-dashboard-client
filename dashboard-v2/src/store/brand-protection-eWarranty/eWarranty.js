import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";
import eWarrantyApi from "../../api/eWarranty";
import _ from "lodash";

//Store for warranty list
export const useEWarrantyListStore = defineStore("eWarrantyList", () => {
  //states
  let warrantyList = ref([]);
  let rowPerPage = ref(2);
  let totalCount = ref(0);
  let listloading = ref(false);
  let pageNumber = ref(0);


  //computed properties
  let totalPages = computed(() =>
    Math.ceil(totalCount.value / rowPerPage.value)
  );

  //utility function
  const dateFormatter = function (date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const d = new Date(date);

    let day = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return month + " " + day + ", " + year;
  };

  const timeFormatter = function (date) {
    const d = new Date(date);

    let hour = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();

    //adding leading zero for hour less than 10
    hour = hour.toString().length < 2 ? "0" + hour.toString() : hour.toString();

    //getting am or pm
    let amPm = d.getHours() > 12 ? "pm" : "am";

    return hour + ":" + d.getMinutes() + " " + amPm;
  };

  //api function
  const fetchEWarrantyRequests = async function (status) {

    listloading.value = true

    const response = await eWarrantyApi.fetchEWarrantyList(rowPerPage.value, pageNumber.value, status)

    const result = response.data.data

    warrantyList.value = result.list.map((item) => {
      return {
        ...item,
        customerName: "John Doe",
        inVoiceNo: "KDJHF988S",
        mobileNumber: item.userPhoneNumber,
        purchaseFrom: "DN SUPERCOVER BRILLIANT WHITE 20L",
        purchasedOn: dateFormatter(item.purchaseDate),
        lastUpdatedOn:
          dateFormatter(1670284800000) + " " + timeFormatter(1670284800000),
        status: _.capitalize(item.status),
        sku: {
          code: "test-poc-spd_l2",
          isActive: true,
          name: "test-POC-SPD_L2",
          packagingLevel: 2,
        },
      };
    });
    totalCount.value = result.totalCount;
    listloading.value = false
  };

  return { warrantyList, listloading, rowPerPage, totalPages, totalCount, pageNumber, fetchEWarrantyRequests };
});

//Store for warranty form
export const useEWarrantyFromStore = defineStore("eWarrantyForm", () => {
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

  let formLoaded = ref(false)

  //api function
  const fetchWarranty = async function (payload) {

    formLoaded.value = false
    const response = await eWarrantyApi.fetchWarranty(payload);

    let result = response.data.data;

    basicDetailData.value = [
      {
        label: "Mobile",
        value: result.userPhoneNumber,
      },
      {
        label: "Customer",
        value: result.userName,
      },
      {
        label: "SKU",
        value: result.sku.name,
      },
      {
        label: "Purchased From",
        value: result.purchasedFrom,
      },
      {
        label: "Requested On",
        value: result.activationRequestDate,
      },
      {
        label: "Purchased On",
        value: result.purchasedOn,
      },
      {
        label: "Invoice Number",
        value: result.invoiceNumber,
      },
    ];

    productDetailData.value = [
      {
        label: "Serial Number",
        value: result.productDetails.serialNo,
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
        value: 'L' + result.productDetails.packagingLevel,
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
        value: result.productDetails.ownership.owner.name,
      },
    ];

    formLoaded.value = true
  };

  return { basicDetailData, productDetailData, formLoaded, fetchWarranty };
});
