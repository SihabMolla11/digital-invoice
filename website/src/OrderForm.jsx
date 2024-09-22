import React from "react";
import { useForm } from "react-hook-form";
import { PiDownloadSimple } from "react-icons/pi";
import ProductSection from "./components/ProductSection";
import StoreSection from "./components/StoreSection";
import AmountSection from "./components/AmountSection";

const OrderForm = () => {


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
  const onSubmit = (data) => console.log(data);



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
        <AmountSection register={register} errors={errors} />

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
    </div>
  );
};

export default OrderForm;
