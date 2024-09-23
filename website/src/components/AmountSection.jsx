import React, { useEffect } from "react";

const AmountSection = ({
  errors,
  register,
  watch,
  setValue,
  previousDueAmount,
}) => {
  const productFieldName = "productsData";

  const productsData = watch(productFieldName);
  const advancedAmount = watch("advancedAmount");

  const grandTotalPrice = productsData?.reduce(
    (a, b) => a + (b?.price || 0) * (b?.quantity || 0),
    0
  );

  const due = grandTotalPrice - advancedAmount;

  useEffect(() => {
    setValue("grandTotal", grandTotalPrice);
    setValue("dueAmount", due);
  }, [grandTotalPrice, due]);

  return (
    <>
      <div className="flex flex-col md:flex-row flex-col-reverse gap-6 md:items-end justify-between">
        <div>
          <div className="flex flex-col mt-8 md:mt-0">
            <input
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
            <div className="flex items-start  md:items-center justify-start md:justify-end flex-col md:flex-row">
              <label className="font-semibold mr-2" htmlFor="grand-total">
                Grand Total:
              </label>
              <div>
                <input
                  id="grand-total"
                  disabled
                  type="number"
                  value={grandTotalPrice}
                  defaultValue={0}
                  className="default-input "
                  placeholder="Grand Total"
                  {...register("grandTotal", { required: true })}
                />
                {errors.grandTotal && (
                  <span className="input-error">give total amount</span>
                )}
              </div>
            </div>

            <div className="flex items-start  md:items-center justify-start md:justify-end flex-col md:flex-row">
              <label className="font-semibold mr-2" htmlFor="advance-amount">
                Advance Amount:
              </label>
              <div>
                <input
                  value={advancedAmount}
                  id="advance-amount"
                  defaultValue={0}
                  type="number"
                  className="default-input "
                  placeholder="Advance Amount"
                  {...register("advancedAmount", { required: true })}
                />
                {errors.advancedAmount && (
                  <span className="input-error">give advance amount</span>
                )}
              </div>
            </div>

            <div className="flex items-start  md:items-center justify-start md:justify-end flex-col md:flex-row">
              <label className="font-semibold mr-2" htmlFor="due-amount">
                Due Amount:
              </label>
              <div>
                <input
                  value={due}
                  id="due-amount"
                  disabled
                  type="number"
                  defaultValue={0}
                  className="default-input "
                  placeholder="due amount"
                  {...register("dueAmount", { required: true })}
                />
                {errors.dueAmount && (
                  <span className="input-error">give due amount</span>
                )}
              </div>
            </div>

            <div className="flex items-start  md:items-center justify-start md:justify-end flex-col md:flex-row">
              <label
                className="font-semibold mr-2"
                htmlFor="previous-due-amount"
              >
                Previous Due Amount:
              </label>
              <input
                id="previous-due-amount"
                disabled
                type="number"
                value={previousDueAmount || 0}
                defaultValue={0}
                className="default-input "
                placeholder="previous due amount"
              />
            </div>

            <div className="flex items-start  md:items-center justify-start md:justify-end flex-col md:flex-row">
              <label className="font-semibold mr-2" htmlFor="total-due-amount">
                Total Due Amount:
              </label>
              <input
                id="total-due-amount"
                disabled
                type="number"
                value={previousDueAmount + due || 0}
                defaultValue={0}
                className="default-input "
                placeholder="total due amount"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AmountSection;
