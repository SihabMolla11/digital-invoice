import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import OrderDetailModal from "./components/OrderDetailModal";
import { deleteRequest, get } from "./service/api";

const AdminDashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["get-all-order-for-admin"],
    queryFn: () => get("all-order-for-admin"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await deleteRequest(`delete-order/${id}`),
    onSuccess: () => {
      toast.success("order delete successful");
      refetch();
    },
    onError: () => {
      toast.error("some ting went wrong");
    },
  });

  const handelOpenModal = (orderItem) => {
    setOpenModal(true);
    setSelectedOrder(orderItem);
  };

  return (
    <>
      <div className="main-container mt-12">
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="w-full mt-2 border-gray-400 ">
            <thead className="w-full ">
              <tr className="w-full bg-body-background  bg-gray-200 border border-gray-400  ">
                <th className="table-head-row">#</th>
                <th className="table-head-row">Store Name</th>
                <th className="table-head-row">Store Owner Name</th>
                <th className="table-head-row">Ordered Date</th>
                <th className="table-head-row">Delivery Date</th>
                <th className="table-head-row">Action</th>
              </tr>
            </thead>
            <tbody className="w-full border-2  ">
              {data?.map((item, index) => {
                const orderedDate = new Date(item?.orderInfo?.created_at);
                const deliveryDate = new Date(item?.orderInfo?.deliveryDate);
                return (
                  <tr
                    key={index}
                    className="w-full border-b border-b-gray-600 "
                  >
                    <td className="w-[1%] py-2 px-4 min-w-4 text-center">
                      {index + 1}
                    </td>
                    <td className="w-[29%] py-2 px-4 min-w-30">
                      {item?.orderInfo?.storeId?.storeName}
                    </td>
                    <td className="w-[18%] py-2 px-4 min-w-8">
                      {item?.orderInfo?.storeId?.storeOwnerName}
                    </td>
                    <td className="w-[18%] py-2 px-4 min-w-8">
                      {orderedDate?.toLocaleDateString()}
                    </td>
                    <td className="w-[18%] py-2 px-4 min-w-8">
                      {deliveryDate?.toLocaleDateString()}
                    </td>
                    <td className="w-[10%] py-1 min-w-8 ">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            deleteMutation.mutate(item?.orderInfo?._id)
                          }
                          className=" p-2 rounded-full"
                          type="button"
                        >
                          <RiDeleteBin6Line className="size-4 text-red-500 hover:text-red-600" />
                        </button>
                        <button
                          onClick={() => handelOpenModal(item)}
                          className="bg-blue-500 hover:bg-blue-600 px-2 py-1 text-xs rounded-md text-white"
                          type="button"
                        >
                          Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {openModal && (
        <OrderDetailModal
          data={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

export default AdminDashboard;
