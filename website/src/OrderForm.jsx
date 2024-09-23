import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PiDownloadSimple } from "react-icons/pi";
import { useReactToPrint } from "react-to-print";
import AmountSection from "./components/AmountSection";
import InvoiceForPrint from "./components/InvoiceForPrint";
import ProductSection from "./components/ProductSection";
import StoreSection from "./components/StoreSection";
import { get, post } from "./service/api";

const OrderForm = () => {
  const printWindow = useRef();
  const [storeName, setStoreName] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    values: {
      productsData: [{}],
    },
  });

  const { isLoading, data: previousOrdered } = useQuery({
    queryKey: ["get-due-amount-for-store", storeName],
    queryFn: () => get(`all-due-amount-for-store?storeName=${storeName}`),
  });

  const previousDueAmount = previousOrdered?.orders?.length
    ? previousOrdered?.orders?.reduce((a, b) => a + b?.dueAmount, 0)
    : 0;

  const name = watch("storeName");
  const createOrder = useMutation({
    mutationFn: async (data) => await post("create-order", data),
    onSuccess: (response) => {
      toast.success("Order posed successfully");
      profilePrint();
      reset();
    },
    onError: () => {
      message.error("Something went wrong");
    },
  });

  const onSubmit = (data) => {
    const storeData = {
      storeName: data?.storeName,
      storeOwnerName: data?.storeOwnerName,
      storeAddress: data?.storeAddress,
    };

    const orderData = {
      deliveryDate: new Date(data?.deliveryDate),
      sellsExecutiveName: data?.sellsExecutiveName,
      advancedAmount: Number(data?.advancedAmount),
      dueAmount: Number(data?.dueAmount),
    };

    const productsData = data?.productsData?.map((product) => {
      return {
        productName: product?.productName,
        price: Number(product?.price),
        quantity: Number(product?.quantity),
        total: Number(product?.total),
      };
    });

    createOrder.mutate({ storeData, orderData, productsData });
  };

  const profilePrint = useReactToPrint({
    content: () => printWindow.current,
    pageStyle: `@media print {
            .hide-the-component{
                display:block !important;
            }
            @page {
            size: 750px 1100px;
              margin: 2mm;
            }
          }`,
    removeAfterPrint: true,
    documentTitle: `Invoice Of order`,
  });

  useEffect(() => {
    setStoreName(name);
    setValue("storeName", storeName);
  }, [name]);

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <StoreSection
          register={register}
          errors={errors}
          setStoreName={setStoreName}
          storeName={storeName}
          setValue={setValue}
        />
        <ProductSection
          register={register}
          errors={errors}
          control={control}
          watch={watch}
          setValue={setValue}
        />
        <AmountSection
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          previousDueAmount={previousDueAmount}
        />

        <div
          className="
        flex justify-end py-10"
        >
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 rounded-sm py-2 capitalize flex items-center gap-4"
            type="submit"
          >
            confirm & print <PiDownloadSimple className="size-7" />
          </button>
        </div>
      </form>
      <div className="hide-the-component" ref={printWindow}>
        <InvoiceForPrint
          getValues={getValues}
          previousDueAmount={previousDueAmount}
        />
      </div>
    </div>
  );
};

export default OrderForm;
