import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PiDownloadSimple } from "react-icons/pi";
import AmountSection from "./components/AmountSection";
import InvoiceForPrint from "./components/InvoiceForPrint";
import ProductSection from "./components/ProductSection";
import StoreSection from "./components/StoreSection";
import { post } from "./service/api";

const OrderForm = () => {
  const createOrder = useMutation({
    mutationFn: async (data) => await post("create-order", data),
    onSuccess: (response) => {
      toast.success("Order posed successfully");
    },
    onError: () => {
      message.error("Something went wrong");
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    values: {
      productsData: [{}],
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

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <StoreSection register={register} errors={errors} />
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
      <InvoiceForPrint />
    </div>
  );
};

export default OrderForm;
