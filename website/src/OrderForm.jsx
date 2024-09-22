import React from "react";
import { useForm } from "react-hook-form";
import { PiDownloadSimple } from "react-icons/pi";
import ProductSection from "./components/ProductSection";
import StoreSection from "./components/StoreSection";

const OrderForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    values: {
      productsData: [{}],
    },
  });
  const onSubmit = (data) => console.log(data);

//   console.log(watch("productsData"));

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <StoreSection register={register} errors={errors} />
        <ProductSection register={register} errors={errors} control={control} />
        <div className="flex flex-col md:flex-row flex-col-reverse gap-6 md:items-end justify-between">
          <div>
            <div className="flex flex-col">
              <input
                id="date"
                className="default-input "
                placeholder="sales executive name"
                {...register("sellsExecutiveName", { required: true })}
              />
              {errors.sellsExecutiveName && (
                <span className="input-error">give sales executive name</span>
              )}
            </div>
          </div>
          <div className="mt-8 text-end">
            <div className="space-y-2">
              <p className=" mr-2 text-lg uppercase" htmlFor="date">
                Grand Total Amount: <span className="font-medium">300</span>
              </p>

              <p className=" mr-2 text-lg uppercase" htmlFor="date">
                Advance Amount: <span className="font-medium">300</span>
              </p>

              <p className=" mr-2 text-lg uppercase" htmlFor="date">
                Due Amount: <span className="font-medium">300</span>
              </p>
              <p className=" mr-2 text-lg uppercase" htmlFor="date">
                Previous Due Amount: <span className="font-medium">300</span>
              </p>
              <p className=" mr-2 text-lg uppercase" htmlFor="date">
                Total Due Amount: <span className="font-medium">300</span>
              </p>
            </div>
          </div>
        </div>

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
