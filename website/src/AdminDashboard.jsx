import React from "react";

const AdminDashboard = () => {
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
                <tr key={index} className="w-full border-b border-b-gray-600 ">
                  <td className="w-[1%] p-2 min-w-4">{index + 1}</td>
                  <td className="w-[39%] p-2 min-w-60">{item?.productName}</td>
                  <td className="w-[20%] p-2 min-w-32">{item?.price}</td>
                  <td className="w-[20%] p-2 min-w-32">{item?.quantity}</td>
                  <td className="w-[20%] p-2 min-w-32">{item?.total}</td>
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
