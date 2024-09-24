import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  let { pathname } = useLocation();

  return (
    <div className="main-container ">
      <div className="mt-6 flex items-center justify-between border-b-4 border-black pb-2">
        <Link to="/" className="flex items-center gap-2">
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
        </Link>
        {pathname === "/admin-dashboard" ? (
          <h2 className="text-4xl hidden md:block">ADMIN DASHBOARD</h2>
        ) : (
          <h2 className="text-4xl hidden md:block">INVOICE</h2>
        )}
      </div>
    </div>
  );
};

export default Header;
