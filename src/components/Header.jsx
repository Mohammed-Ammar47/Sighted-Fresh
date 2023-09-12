import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { GrClose, GrMenu } from "react-icons/gr";
import {
  PiUserCirclePlusBold,
  PiShoppingCartBold,
  PiUserCircleBold,
} from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [userState, setUserState] = useState("signed out");
  const [currentPath, setCurrentPath] = useState("/store");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  if (currentPath !== location.pathname) {
    setCurrentPath(location.pathname);
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState("signed in");
      } else {
        setUserState("signed out");
      }
    });
  }, [auth]);

  return (
    <>
      <header className="flex justify-between sticky w-full items-center py-2.5 px-2 sm:px-32 bg-[#F1F1F1] z-50">
        <img
          className="flex h-7 md:h-10"
          src="https://api.logo.com/api/v2/images?logo=logo_31050228-a10f-4014-9f77-8779b7a20f5f&format=webp&margins=0&quality=60&width=500&background=transparent&u=1691277569"
        />
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className="text-2xl absolute right-2.5 top-3 cursor-pointer sm:hidden  rounded-md hover:bg-gray-100 "
        >
          {open ? <GrClose /> : <GrMenu />}
        </div>
        <div
          className={` right-0  p-3 sm:p-0 absolute sm:static sm:space-x-3 md:z-auto z-[5] w-full md:w-auto md:pl-0 bg-white sm:bg-transparent transition-all duration-300 ease-in-out ${
            open ? "top-12  " : "top-[-280px]"
          }`}
        >
          <ul className="flex bg-white ring-2 ring-white  rounded-full flex-col sm:flex-row">
            <li
              onClick={() => {
                navigate("/");
              }}
              className={`mb-2 sm:mb-0 items-center rounded-full text-base lg:text-lg font-medium  px-2.5 font-family-Roboto hover:ring-[#E70000] hover:ring-2 focus:ring-white cursor-pointer ${
                currentPath === "/"
                  ? "bg-[#E70000] text-[#F1F1F1] ring-[#E70000] ring-2"
                  : "bg-white text-[#E70000] ring-white ring-2"
              } `}
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/store");
              }}
              className={`mb-2 sm:mb-0 items-center rounded-full text-base lg:text-lg font-medium px-2.5 sm:mx-1 font-family-Roboto focus:outline-none focus:ring-2  hover:ring-[#E70000] hover:ring-2 focus:ring-white cursor-pointer ${
                currentPath === "/store"
                  ? "bg-[#E70000] text-[#F1F1F1] ring-[#E70000] ring-2"
                  : "bg-white text-[#E70000] ring-white ring-2"
              }`}
            >
              Store
            </li>
            <li
              onClick={() => {
                navigate("/deals");
              }}
              className={`mb-2 sm:mb-0 items-center rounded-full text-base lg:text-lg font-medium font-family-Roboto px-2.5 hover:ring-[#E70000] hover:ring-2 cursor-pointer ${
                currentPath === "/deals"
                  ? "bg-[#E70000] text-[#F1F1F1] ring-[#E70000] ring-2"
                  : "bg-white text-[#E70000] ring-white ring-2"
              }`}
            >
              Deals
            </li>
          </ul>
        </div>
        <ul className="flex space-x-2 pr-8 sm:space-x-5">
          <li
            onClick={() => {
              navigate("/cart");
            }}
            className={` flex items-center  rounded-full text-2xl sm:text-lg font-medium font-family-Roboto whitespace-nowrap px-1  sm:px-2.5 hover:ring-[#E70000] hover:ring-2 cursor-pointer ${
              currentPath === "/cart"
                ? "bg-[#E70000] text-[#F1F1F1] ring-[#E70000] ring-2"
                : "bg-white text-[#E70000] ring-white ring-2"
            }`}
          >
            <p className="hidden sm:flex">Cart </p>
            <PiShoppingCartBold className="sm:hidden text-xl px-0" />
          </li>
          <li
            onClick={() => {
              navigate("/profile");
            }}
            className={`flex items-center rounded-full text-2xl sm:text-lg font-medium font-family-Roboto whitespace-nowrap px-1 sm:pt-0 sm:px-2.5 hover:ring-[#E70000] hover:ring-2 cursor-pointer ${
              currentPath === "/profile"
                ? "bg-[#E70000] text-[#F1F1F1] ring-[#E70000] ring-2"
                : "bg-white text-[#E70000] ring-white ring-2"
            }`}
          >
            {userState === "signed out" ? (
              <>
                <p className="hidden sm:flex">Sign In </p>
                <PiUserCirclePlusBold className="sm:hidden text-xl px-0" />
              </>
            ) : (
              <>
                <p className="hidden sm:flex">Profile</p>
                <PiUserCircleBold className="sm:hidden text-xl px-0" />
              </>
            )}
          </li>
        </ul>
      </header>
    </>
  );
}
