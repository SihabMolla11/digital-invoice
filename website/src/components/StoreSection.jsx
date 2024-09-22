import React from "react";

const StoreSection = ({ register, errors }) => {
  const date = new Date();
  return (
    <div className="mt-12">
      <div className="flex w-full flex-col flex-col-reverse  md:flex-row md:justify-between items-start gap-8 md:gap-16">
        <div className="md:w-[70%] w-full">
          <h4 className="text-xl font-semibold">Store Info:</h4>
          <div className="mt-2 space-y-2">
            <div className="flex flex-col">
              <label className="font-semibold text-sm" htmlFor="store-name">
                Store Name:
              </label>
              <input
                id="store-name"
                className="default-input "
                placeholder="store name"
                {...register("storeName", { required: true })}
              />
              {errors.storeName && (
                <span className="input-error">give store name</span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-sm" htmlFor="owner-name">
                Store Owner Name:
              </label>
              <input
                id="owner-name"
                className="default-input "
                placeholder="store owner name"
                {...register("storeOwnerName", { required: true })}
              />
              {errors.storeOwnerName && (
                <span className="input-error">give store owner name</span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-sm" htmlFor="store-address">
                Store Address:
              </label>
              <textarea
                id="store-address"
                className="default-input "
                placeholder="store address"
                {...register("storeAddress", { required: true })}
              />
              {errors.storeAddress && (
                <span className="input-error">give store address</span>
              )}
            </div>
          </div>
        </div>
        <div className="md:w-[30%] w-full">
          <h4 className="text-xl font-semibold">Dates:</h4>
          <div className="mt-2 space-y-2 ">
            <div className="flex flex-col">
              <label className="font-semibold text-sm" htmlFor="date">
                Order Date:
              </label>
              <input
                disabled
                id="date"
                type="date"
                className="default-input "
                value={new Date().toISOString().split("T")[0]}
                {...register("date")}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-sm" htmlFor="delivery-date">
                Delivery Date:
              </label>
              <input
                id="delivery-date"
                type="date"
                className="default-input w-full"
                {...register("deliveryDate", { required: true })}
              />
              {errors.deliveryDate && (
                <span className="input-error">give delivery date</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSection;
