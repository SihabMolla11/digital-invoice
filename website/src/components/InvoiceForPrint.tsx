import React from "react";
import Header from "./Header";

const InvoiceForPrint = () => {
  const date = new Date();

  return (
    <div className="py-56">
      <Header />
      <div className="main-container mt-12">
        <div className="flex items-start justify-between w-full">
          <div>
            <h4 className="text-xl font-semibold">Store Info:</h4>
            <div className="mt-2">
              <p className="text-gray-600">
                Store Name:
                <span className="font-semibold text-black ml-2">
                  Bangal Store
                </span>
              </p>
              <p className="text-gray-600">
                Store Owner Name:
                <span className="font-semibold text-black ml-2">
                  Bangal Store
                </span>
              </p>
              <p className="text-gray-600">
                Store Address:
                <span className="font-semibold text-black ml-2">
                  Bangal Store
                </span>
              </p>
              <p className="text-gray-600">
                Order Status:
                <span className="font-semibold text-black ml-2">Pending</span>
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Store Info:</h4>
            <div className="mt-2">
              <p className="text-gray-600">
                Order Date:
                <span className="font-semibold text-black ml-2">
                  {date?.toLocaleDateString()}
                </span>
              </p>
              <p className="text-gray-600">
                Delivery Date:
                <span className="font-semibold text-black ml-2">
                  {date?.toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-xl font-semibold">Product Info:</h4>

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
                </tr>
              </thead>
              <tbody className="w-full border-2  ">
                {/* {fields?.map((item, index) => {
                  return ( */}
                <tr className="w-full ">
                  <td className="w-[1%] p-2 min-w-4">1</td>
                  <td className="w-[39%] p-2 min-w-60">product name</td>
                  <td className="w-[20%] p-2 min-w-32">30</td>
                  <td className="w-[20%] p-2 min-w-32">40</td>
                  <td className="w-[20%] p-2 min-w-32">566</td>
                </tr>
                {/* );
                })} */}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row flex-col-reverse gap-6 md:items-end justify-between">
            <div>
              <div className="flex flex-col border-t-2 border-black min-w-40 text-center ">
                <p className="capitalize ">sales executive</p>
              </div>
            </div>
            <div className="mt-8 text-end">
              <div className="space-y-2">
                <p className="font-normal text-gray-700 uppercase mr-2">
                  Grand Total:{" "}
                  <span className="text-xl font-semibold text-black">3</span>
                </p>

                <p className="font-normal text-gray-700 uppercase mr-2">
                  Advance Amount:{" "}
                  <span className="text-xl font-semibold text-black">3</span>
                </p>
                <p className="font-normal text-gray-700 uppercase mr-2">
                  Due Amount:{" "}
                  <span className="text-xl font-semibold text-black">3</span>
                </p>
                <p className="font-normal text-gray-700 uppercase mr-2">
                  Previous Due Amount:{" "}
                  <span className="text-xl font-semibold text-black">3</span>
                </p>
                <p className="font-normal text-gray-700 uppercase mr-2">
                  Total Due Amount:{" "}
                  <span className="text-xl font-semibold text-black">3</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForPrint;
