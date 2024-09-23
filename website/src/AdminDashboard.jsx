import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { get } from "./service/api";

const AdminDashboard = () => {
  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["get-all-order-for-admin"],
    queryFn: () => get("all-order-for-admin"),
  });

  return (
    <div className="main-container mt-12">
      <div className="overflow-x-auto overflow-y-hidden">
        <table className="w-full mt-2 border-gray-400 ">
          <thead className="w-full ">
            <tr className="w-full bg-body-background  bg-gray-200 border border-gray-400  ">
              <th className="uppercase text-sm text-black-text text-start font-semibold text-nowrap py-2 px-2">
                #
              </th>
              <th className="uppercase text-sm text-black-text text-start font-semibold text-nowrap py-2 px-2">
                Store Name
              </th>
              <th className="uppercase text-sm text-start text-black-text font-semibold text-nowrap py-2">
                Store Owner Name
              </th>
              <th className="uppercase text-sm text-black-text text-start font-semibold text-nowrap py-2">
                Store Address
              </th>
              <th className="uppercase text-sm text-black-text text-start font-semibold text-nowrap py-2">
                Ordered Date
              </th>
              <th className="uppercase text-sm text-black-text text-start font-semibold text-nowrap py-2">
                Delivery Date
              </th>
              <th className="uppercase text-sm text-black-text text-start font-semibold text-nowrap py-2">
                Total Amount
              </th>
              <th className="uppercase text-sm text-black-text text-start font-semibold text-nowrap py-2">
                Advance amount
              </th>
              <th className="uppercase text-sm text-black-text text-start font-semibold text-nowrap py-2">
                Due amount
              </th>
            </tr>
          </thead>
          <tbody className="w-full border-2  ">
            {data?.map((item, index) => {
              const orderedDate = new Date(item?.orderInfo?.created_at);
              const deliveryDate = new Date(item?.orderInfo?.deliveryDate);
              return (
                <tr key={index} className="w-full border-b border-b-gray-600 ">
                  <td className="w-[1%] p-2 min-w-4">{index + 1}</td>
                  <td className="w-[20%] p-2 min-w-60">
                    {item?.orderInfo?.storeId?.storeName}
                  </td>
                  <td className="w-[20%] p-2 min-w-60">
                    {item?.orderInfo?.storeId?.storeOwnerName}
                  </td>
                  <td className="w-[20%] p-2 min-w-60">
                    {item?.orderInfo?.storeId?.storeAddress?.length > 35
                      ? item?.orderInfo?.storeId?.storeAddress?.slice(0, 35) +
                        "..."
                      : item?.orderInfo?.storeId?.storeAddress}
                  </td>
                  <td className="w-[20%] p-2 min-w-60">
                    {orderedDate?.toLocaleDateString()}
                  </td>
                  <td className="w-[20%] p-2 min-w-60">
                    {deliveryDate?.toLocaleDateString()}
                  </td>
                  <td className="w-[20%] p-2 min-w-60">
                    {item?.orderInfo?.totalAmount}
                  </td>
                  <td className="w-[20%] p-2 min-w-60">
                    {item?.orderInfo?.advancedAmount}
                  </td>
                  <td className="w-[20%] p-2 min-w-60">
                    {item?.orderInfo?.dueAmount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
