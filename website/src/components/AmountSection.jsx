import React from "react";

const AmountSection = ({ errors, register }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row flex-col-reverse gap-6 md:items-end justify-between">
        <div>
          <div className="flex flex-col">
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
            <div>
              <label className="font-semibold mr-2" htmlFor="grand-total">
                Grand Total:
              </label>
              <input
                id="grand-total"
                disabled
                defaultValue={0}
                className="default-input "
                placeholder="Grand Total"
                {...register("grandTotal", { required: true })}
              />
              {errors.grandTotal && (
                <span className="input-error">give total amount</span>
              )}
            </div>

            <div>
              <label className="font-semibold mr-2" htmlFor="advance-amount">
                Advance Amount:
              </label>
              <input
                id="advance-amount"
                defaultValue={0}
                className="default-input "
                placeholder="Advance Amount"
                {...register("advancedAmount", { required: true })}
              />
              {errors.advancedAmount && (
                <span className="input-error">give advance amount</span>
              )}
            </div>

            <div>
              <label className="font-semibold mr-2" htmlFor="due-amount">
                Due Amount:
              </label>
              <input
                id="due-amount"
                disabled
                defaultValue={0}
                className="default-input "
                placeholder="due amount"
                {...register("dueAmount", { required: true })}
              />
              {errors.dueAmount && (
                <span className="input-error">give due amount</span>
              )}
            </div>

            <div>
              <label
                className="font-semibold mr-2"
                htmlFor="previous-due-amount"
              >
                Previous Due Amount:
              </label>
              <input
                id="previous-due-amount"
                disabled
                defaultValue={0}
                className="default-input "
                placeholder="previous due amount"
                {...register("dueAmount")}
              />
            </div>

            <div>
              <label className="font-semibold mr-2" htmlFor="total-due-amount">
                Total Due Amount:
              </label>
              <input
                id="total-due-amount"
                disabled
                defaultValue={0}
                className="default-input "
                placeholder="total due amount"
                {...register("dueAmount")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AmountSection;
