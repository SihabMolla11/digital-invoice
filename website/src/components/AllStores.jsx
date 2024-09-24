import { useQuery } from "@tanstack/react-query";
import React from "react";
import { get } from "../service/api";

const AllStores = ({ setStoreName, storeName, setValue }) => {
  const { data: allStore } = useQuery({
    queryKey: ["get-allStore"],
    queryFn: () => get("all-store"),
  });

  const fendedProduct =
    storeName && storeName != ""
      ? allStore?.filter((item) =>
          item?.storeName?.toLowerCase()?.includes(storeName?.toLowerCase())
        )
      : allStore;

  const handelSelectStoreName = (value) => {
    setValue("storeName", value);
    setStoreName(value);
  };

  return (
    <>
      <div className="flex flex-col text-start">
        {fendedProduct?.map((item) => (
          <button
            onClick={() => handelSelectStoreName(item?.storeName)}
            type="button"
            className="text-start px-6 py-2 hover:bg-gray-200"
            key={item?._id}
          >
            {item?.storeName}
          </button>
        ))}
      </div>
    </>
  );
};

export default AllStores;
