"use client";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaList } from "react-icons/fa6";

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleToggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="flex bg-gradient-to-r from-teal-800 to-yellow-600 items-center">
      <main className="w-full">
        <div className="max-w-[1440px] mx-auto flex justify-between p-6 items-center text-white">
          {/* Logo */}
          <div className="text-3xl font-bold">
            <p>CARRY IT</p>
          </div>

          {/* Navigation Menu */}
          <ul className="hidden md:flex gap-12 text-md font-bold">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/Products-Listing"}>Products</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
            <li>
              <Link href={"/inventory"}>Inventory</Link>
            </li>
          </ul>

          {/* Icons */}
          <div className="flex gap-3">
            <Link href={"/User"}>
            <CgProfile className="w-6 h-6" /></Link>
            <Link href={"/cart"}>
              <LuShoppingCart className="w-6 h-6" />
            </Link>
            <Link href={"/wishlist"}><FaList /></Link>
          </div>
        </div>
      </main>

      {/* Mobile View Menu */}
      <div className="md:hidden p-6 relative">
        {/* Show Menu Icon when the menu is closed */}
        {!open && (
          <IoMdMenu
            className="w-6 h-6 fill-white cursor-pointer"
            onClick={handleToggleMenu}
          />
        )}

        {/* Show Close Icon when the menu is open */}
        {open && (
          <div>
            <RxCross2
              className="w-6 h-6 fill-white absolute top-4 right-6 cursor-pointer"
              onClick={handleToggleMenu}
            />
            <ul className="absolute top-14 right-6 bg-white text-black shadow-lg rounded-md py-2 z-10 w-40">
              <li className="p-2 px-4 hover:bg-[#f0f0f0]">
                <Link href={"/"}>Home</Link>
              </li>
              <li className="p-2 px-4 hover:bg-[#f0f0f0]">
                <Link href={"/Homepage/Page_02"}>Products</Link>
              </li>
              <li className="p-2 px-4 hover:bg-[#f0f0f0]">
                <Link href={"/contact"}>Contact</Link>
              </li>
              <li className="p-2 px-4 hover:bg-[#f0f0f0]">
                <Link href={"/inventory"}>Inventory</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
