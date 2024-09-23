import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const OrderDetailModal = ({ setOpenModal, setSelectedOrder, data }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handelCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  console.log("bangal item", data);

  const orderDate = new Date(data?.orderInfo?.created_at);
  const deliveryDate = new Date(data?.orderInfo?.deliveryDate);

  const totalPrice = data?.products?.reduce(
    (a, b) => a + b?.price * b?.quantity,
    0
  );

  const handelChangeStatus = (event) => {
    console.log("vent", event);
  };

  return (
    <div className="absolute w-full h-full bg-[#00000044] top-0">
      <div className="flex w-full h-full items-center justify-center ">
        <div className="bg-white w-full max-w-[900px] p-8 rounded-md relative max-h-[80%] overflow-y-auto overflow-x-hidden">
          <button
            onClick={handelCloseModal}
            className="bg-red-500 hover:bg-red-600 p-2 rounded-full absolute top-[10px] right-[10px]"
            type="button"
          >
            <RxCross1 className="text-white" />
          </button>

          <div className=" ">
            <div className="mb-6">
              <p className="text-xl flex flex-col md:flex-row text-center  border-b-2  border-black">
                <span>Sales Executive:</span>
                <span className="font-semibold ml-2">
                  {data?.orderInfo?.sellsExecutiveName}
                </span>
              </p>
            </div>

            <div className="flex items-start justify-between flex-col md:flex-row gap-6 w-full">
              <div>
                <h4 className="text-xl font-semibold">Store Info:</h4>
                <div className="mt-2">
                  <p className="text-gray-600">
                    Store Name:
                    <span className="font-semibold text-black ml-2">
                      {data?.orderInfo?.storeId?.storeName}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Store Owner Name:
                    <span className="font-semibold text-black ml-2">
                      {data?.orderInfo?.storeId?.storeOwnerName}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Store Address:
                    <span className="font-semibold text-black ml-2">
                      {data?.orderInfo?.storeId?.storeOwnerName}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Order Status:
                    <span className="font-semibold text-black ml-2">
                      {data?.orderInfo?.orderStatus}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold">Store Info:</h4>
                <div className="mt-2">
                  <p className="text-gray-600">
                    Order Date:
                    <span className="font-semibold text-black ml-2">
                      {orderDate?.toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Delivery Date:
                    <span className="font-semibold text-black ml-2">
                      {deliveryDate?.toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-semibold">Product Info:</h4>

              <div className="overflow-x-auto overflow-y-hidden">
                <table className="w-full mt-2 border-gray-400 ">
                  <thead className="w-full ">
                    <tr className="w-full bg-body-background  bg-gray-200 border border-gray-400  ">
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
                    </tr>
                  </thead>
                  <tbody className="w-full border-2  ">
                    {data?.products?.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className="w-full border-b border-b-gray-600 "
                        >
                          <td className="w-[1%] p-2 min-w-4">{index + 1}</td>
                          <td className="w-[39%] p-2 min-w-60">
                            {item?.productName}
                          </td>
                          <td className="w-[20%] p-2 min-w-32">
                            {item?.price}
                          </td>
                          <td className="w-[20%] p-2 min-w-32">
                            {item?.quantity}
                          </td>
                          <td className="w-[20%] p-2 min-w-32">
                            {item?.total}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="">
                {/* <div>
                  <div className="flex flex-col min-w-36   ">
                    <h2 className="capitalize text-lg font-semibold">
                      Change Status:
                    </h2>
                    <div className="flex lg:items-center gap-2 flex-col lg:flex-row items-start">
                      <select
                        className="border border-black focus:outline-none focus:border-green-600 py-1 px-2 w-32"
                        name="cars"
                        id="cars"
                        onChange={(event) =>
                          setSelectedStatus(event?.target?.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="inprogress">Inprogress</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancel">Cancel</option>
                      </select>{" "}
                      <div>
                        <button
                          className="bg-green-500 text-white hover:bg-green-600 px-4 py-1 rounded-sm"
                          type="button"
                        >
                          Save Change
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="mt-8 text-start">
                  <div className="space-y-2">
                    <p className="font-normal text-gray-700 uppercase mr-2">
                      Grand Total:{" "}
                      <span className="text-xl font-semibold text-black">
                        {totalPrice}
                      </span>
                    </p>

                    <p className="font-normal text-gray-700 uppercase mr-2">
                      Advance Amount:{" "}
                      <span className="text-xl font-semibold text-black">
                        {data?.orderInfo?.advancedAmount}
                      </span>
                    </p>
                    <p className="font-normal text-gray-700 uppercase mr-2">
                      Due Amount:{" "}
                      <span className="text-xl font-semibold text-black">
                        {data?.orderInfo?.dueAmount}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-end justify-between">
                <div className="flex flex-col min-w-36   ">
                  <h2 className="capitalize text-lg font-semibold">
                    Change Status:
                  </h2>
                  <div className="flex lg:items-center gap-2 flex-col lg:flex-row items-start">
                    <select
                      className="border border-black focus:outline-none focus:border-green-600 py-1 px-2 w-32"
                      name="cars"
                      id="cars"
                      onChange={(event) =>
                        setSelectedStatus(event?.target?.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="inprogress">Inprogress</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancel">Cancel</option>
                    </select>{" "}
                    <div>
                      <button
                        className="bg-green-500 text-white hover:bg-green-600 px-4 py-1 rounded-sm"
                        type="button"
                      >
                        Save Change
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handelCloseModal}
                  className="bg-red-500 text-white hover:bg-red-600 px-4 py-1 rounded-sm"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
