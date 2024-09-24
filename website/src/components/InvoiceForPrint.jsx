import React from "react";

const InvoiceForPrint = ({ getValues, previousDueAmount }) => {
  const date = new Date();
  const data = getValues();
  const deliveryDate = new Date(data?.deliveryDate);
  const products = data?.productsData;

  const grandTotalPrice = data?.productsData?.reduce(
    (a, b) => a + (b?.price || 0) * (b?.quantity || 0),
    0
  );

  return (
    <div>
      <div className="main-container ">
        <div className="mt-6 flex items-center justify-between border-b-4 border-black pb-2">
          <div className="flex items-center gap-2">
            <div className="size-[50px]">
              <img
                className="size-full object-cover"
                src="/digital_sales.png"
                alt="digital_sales logo"
                height={50}
                width={50}
              />
            </div>
            <h1 className="text-[32px] font-bold">Digital Sales</h1>
          </div>
          <h2 className="text-4xl ">INVOICE</h2>
        </div>
      </div>
      <div className="main-container mt-12">
        <div className="flex items-start justify-between w-full">
          <div>
            <h4 className="text-xl font-semibold">
              <span className="border-b-2 border-black">Store Info::</span>
            </h4>
            <div className="mt-2">
              <p className="text-gray-600">
                Store Name:
                <span className="font-semibold text-black ml-2">
                  {data?.storeName}
                </span>
              </p>
              <p className="text-gray-600">
                Store Owner Name:
                <span className="font-semibold text-black ml-2">
                  {data?.storeOwnerName}
                </span>
              </p>
              <p className="text-gray-600">
                Store Address:
                <span className="font-semibold text-black ml-2">
                  {data?.storeAddress}
                </span>
              </p>
              <p className="text-gray-600">
                Order Status:
                <span className="font-semibold text-black ml-2">Pending</span>
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold">
              <span className="border-b-2 border-black">Dates:</span>
            </h4>
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
                  {deliveryDate?.toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-xl font-semibold">
            {" "}
            <span className="border-b-2 border-black"> Product Info:</span>
          </h4>

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
                {products?.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="w-full border-b border-b-gray-600 "
                    >
                      <td className="w-[1%] p-2 min-w-4">{index + 1}</td>
                      <td className="w-[39%] p-2 min-w-60">
                        {item?.productName}
                      </td>
                      <td className="w-[20%] p-2 min-w-32">{item?.price}</td>
                      <td className="w-[20%] p-2 min-w-32">{item?.quantity}</td>
                      <td className="w-[20%] p-2 min-w-32">{item?.total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row flex-col-reverse gap-6 md:items-end justify-between">
            <div>
              <div className="flex flex-col border-t-2 border-black min-w-36 max-w-40 text-center ">
                <p className="capitalize ">{data?.sellsExecutiveName}</p>
              </div>
            </div>
            <div className="mt-8 text-end">
              <div className="space-y-2">
                <p className="font-normal text-gray-700 uppercase mr-2">
                  Grand Total:{" "}
                  <span className="text-xl font-semibold text-black">
                    {grandTotalPrice}
                  </span>
                </p>

                <p className="font-normal text-gray-700 uppercase mr-2">
                  Advance Amount:{" "}
                  <span className="text-xl font-semibold text-black">
                    {data?.advancedAmount}
                  </span>
                </p>
                <p className="font-normal text-gray-700 uppercase mr-2">
                  Due Amount:{" "}
                  <span className="text-xl font-semibold text-black">
                    {data?.dueAmount}
                  </span>
                </p>
                <p className="font-normal text-gray-700 uppercase mr-2">
                  Previous Due Amount:{" "}
                  <span className="text-xl font-semibold text-black">
                    {previousDueAmount || 0}
                  </span>
                </p>
                <p className="font-normal text-gray-700 uppercase mr-2">
                  Total Due Amount:{" "}
                  <span className="text-xl font-semibold text-black">
                    {previousDueAmount + data?.dueAmount || 0}
                  </span>
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
