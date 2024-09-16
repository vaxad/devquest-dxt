"use client";
import Link from "next/link";
import Pinned from "./Pinned";

const Navbar = () => {
  return (
    <nav id='nav' className="bg-[#111] p-4 z-50" id="nav">
      <div className="container mx-auto flex items-center [justify-content:space-between]">
        <Link href="/" className="">
          <div className="flex space-x-2 ml-2 flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              className="text-white">
              <path
                d="M24 17.67L30.36 6.675L32.955 8.175L25.11 21.75L15.345 16.125L8.19 28.5H33V31.5H3V4.5H6V26.31L14.25 12L24 17.67Z"
                fill="#DAFE6A"
              />
            </svg>
            <span className="text-white text-xl font-bold mt-1">Insightify</span>
          </div>
        </Link>

        <div>
          <ul className="hidden md:flex space-x-4 ml-auto text-[#727272]  ">
            {/* <li className="hover:text-white">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-white">
              <Link href="/feed">Feed</Link>
            </li>
            <li className="hover:text-white">
              <Link href="/prices">Prices</Link>
            </li> */}
            {/* <li className="hover:text-white">
              <Link href="/api">API</Link>
            </li> */}
          </ul>
        </div>

        <div>
          {/* <button
            className="bg-[#191919] text-white hidden md:flex p-2 rounded-full justify-center items-center pt-[0.875rem] pb-[0.875rem] pl-[0.875rem] pr-[0.875rem]"
            id="nav-btn">
            API Documentation
          </button> */}
          <Pinned/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
