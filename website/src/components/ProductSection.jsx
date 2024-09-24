import React, { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const ProductSection = ({ errors, register, control, watch, setValue }) => {
  const fieldName = "productsData";

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  const productsData = watch(fieldName);
  const prices = productsData?.reduce(
    (a, b) => a + b?.price * (b?.quantity || 0),
    0
  );
  useEffect(() => {
    for (let i = 0; i < fields.length; i++) {
      const price = productsData[i]?.price || 0;
      const quantity = productsData[i]?.quantity || 0;
      const total = price * quantity;
      setValue(`${fieldName}.${i}.total`, total);
    }
  }, [prices]);

  return (
    <div className="mt-8">
      <h4 className="text-xl font-semibold">
        <span className="border-b-2 border-black">Product Info:</span>
      </h4>

      <div className="overflow-x-auto">
        <table className="w-full mt-2 border-gray-400 ">
          <thead className="w-full ">
            <tr className="w-full bg-body-background  bg-gray-200  ">
              <th className="uppercase text-sm text-black-text text-start font-semibold text-nowrap py-2 px-2">
                #
              </th>
              <th className="uppercase text-sm text-black-text text-start font-semibold text-nowrap py-2 px-2">
                Product Name
              </th>
              <th className="uppercase text-sm text-start text-black-text font-semibold text-nowrap py-2">
                Price
              </th>
              <th className="uppercase text-sm text-black-text text-start font-semibold text-nowrap py-2">
                Quantity
              </th>
              <th className="uppercase text-sm text-black-text text-start font-semibold text-nowrap py-2">
                Price
              </th>
              <th className="uppercase text-sm text-black-text text-start font-semibold text-nowrap p-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="w-full border-2  ">
            {fields?.map((item, index) => {
              return (
                <tr key={index} className="w-full ">
                  <td className="w-[1%] p-2 min-w-3">{index + 1}</td>
                  <td className="w-[37%] p-2 min-w-60">
                    <input
                      className="default-input w-full"
                      placeholder="product name"
                      {...register(`${fieldName}.${index}.productName`, {
                        required: true,
                      })}
                    />
                    {errors?.[fieldName]?.[index]?.productName && (
                      <span className="input-error">give product name</span>
                    )}
                  </td>
                  <td className="w-[20%] p-2 min-w-32">
                    <input
                      defaultValue={0}
                      className="default-input w-full"
                      placeholder="price"
                      type="number"
                      {...register(`${fieldName}.${index}.price`, {
                        required: true,
                      })}
                    />
                    {errors?.[fieldName]?.[index]?.price && (
                      <span className="input-error">give product name</span>
                    )}
                  </td>
                  <td className="w-[20%] p-2 min-w-32">
                    <input
                      defaultValue={0}
                      className="default-input w-full"
                      placeholder="quantity"
                      type="number"
                      {...register(`${fieldName}.${index}.quantity`, {
                        required: true,
                      })}
                    />
                    {errors?.[fieldName]?.[index]?.quantity && (
                      <span className="input-error">give product name</span>
                    )}
                  </td>
                  <td className="w-[20%] p-2 min-w-32">
                    {" "}
                    <input
                      disabled
                      defaultValue={0}
                      className="default-input w-full"
                      placeholder="total"
                      type="number"
                      {...register(`${fieldName}.${index}.total`, {
                        required: true,
                      })}
                    />
                    {errors?.[fieldName]?.[index]?.total && (
                      <span className="input-error">give product name</span>
                    )}
                  </td>
                  <td className="w-[2%] p-2 text-center min-w-6">
                    <button
                      onClick={() => remove(index)}
                      className="bg-red-500 hover:bg-red-600 rounded-full"
                      type="button"
                    >
                      <RxCross2 className="size-6 text-white" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-2">
        <button
          className="bg-blue-500 text-sm hover:bg-blue-600 text-white font-semibold px-6 rounded-sm py-1 capitalize flex items-center gap-4"
          onClick={() => append({})}
          type="button"
        >
          Add product <FaPlus className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductSection;
