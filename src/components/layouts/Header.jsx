import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import useLogoutUser from "../../hooks/auth/useLogoutUser";
import { useLoaderData } from "react-router-dom";
import Loading from "../Loading";
import NotificationTab from "./NotificationTab";

export default function Header({ toggle, toggleFunction, small, setSmall }) {
  const user = useLoaderData();
  const [showLogout, setShowLogout] = useState(false);
  const { logout, loading } = useLogoutUser();
  return (
    <div className="p-5 h-20 bg-homeBg w-full text-white flex justify-between items-center sticky top-0 z-10">
      <div className="text-2xl hidden" onClick={() => toggleFunction(!toggle)}>
        <RxHamburgerMenu />
      </div>
      <img className="w-24 object-cover " src="/adminlogo.webp"></img>
      <div className="text-lg md:text-2xl"> Dashboard</div>
      <div className="xl:hidden flex gap-5 items-center">
        <NotificationTab />
        <div className="text-2xl" onClick={() => setSmall(!small)}>
          <RxHamburgerMenu />
        </div>
      </div>

      <div className="relative hidden xl:flex gap-5 items-center">
        <NotificationTab />
        <div
          className="flex cursor-pointer gap-2 items-center border p-2 rounded-lg hover:shadow-md hover:shadow-white hover:bg-blue-500 nav-link"
          onClick={() => setShowLogout(!showLogout)}
        >
          <div>
            <CiUser />
          </div>
          <p>{user ? user.username : "User"}</p>
          <div>
            <RiArrowDropDownLine />
          </div>
        </div>
        {showLogout && (
          <div
            className="z-10 absolute top-14 nav-link animate-slideInTop bg-homeBgGradient p-2 w-full left-0 rounded-lg flex gap-3 items-center cursor-pointer"
            onClick={() => logout()}
          >
            <p>Logout</p>
            <div>
              <IoLogOutOutline />
            </div>
            {loading && <Loading />}
          </div>
        )}
      </div>
    </div>
  );
}
