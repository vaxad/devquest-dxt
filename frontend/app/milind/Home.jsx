"use client";
import React, { useState } from "react";
import PaginationComponent from "../Ketan/Pagination";

export default function Home() {
  const [productLinks, setProductLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    const res = await fetch(
      `https://insightify-9q0p.onrender.com/api/price/find/${searchTerm}`
    );
    const data = await res.json();
    console.log(data);
    setProductLinks(data);
  };

  return (
    <div className="px-2 [isolation:isolate]">
      <div
        className="min-h-[90vh] text-center grid place-items-center overflow-clip"
        id="hero">
        <div className=" flex w-full flex-col justify-center items-center">
          <h1 className="p-2 font-bold" id="heading">
            Track the Price$
            <br />
            Don't Overpay!
          </h1>
          <p className="text-[hsl(0,0%,54%)] text-center text-lg mt-4 w-1/2 mb-12 ">
            Empowering informed purchasing decisions by providing a dynamic
            product price tracking and comparison tool across various e-commerce
            platforms.
          </p>

          <div className="relative w-max mx-auto gap-2">
            <input
              type="search"
              id="search"
              placeholder="Search for ranges of products"
              className="outline-none text-[#F3FF74] rounded-full px-8 py-3 w-96"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              onClick={handleSearch}
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="searchIcon"
              style={{ cursor: "pointer" }}>
              <path
                d="M16.6 18.5L10.3 12.2C9.8 12.6 9.225 12.9167 8.575 13.15C7.925 13.3833 7.23333 13.5 6.5 13.5C4.68333 13.5 3.146 12.8707 1.888 11.612C0.63 10.3533 0.000666667 8.816 0 7C0 5.18333 0.629333 3.646 1.888 2.388C3.14667 1.13 4.684 0.500667 6.5 0.5C8.31667 0.5 9.85433 1.12933 11.113 2.388C12.3717 3.64667 13.0007 5.184 13 7C13 7.73333 12.8833 8.425 12.65 9.075C12.4167 9.725 12.1 10.3 11.7 10.8L18 17.1L16.6 18.5ZM6.5 11.5C7.75 11.5 8.81267 11.0627 9.688 10.188C10.5633 9.31333 11.0007 8.25067 11 7C11 5.75 10.5627 4.68767 9.688 3.813C8.81333 2.93833 7.75067 2.50067 6.5 2.5C5.25 2.5 4.18767 2.93767 3.313 3.813C2.43833 4.68833 2.00067 5.75067 2 7C2 8.25 2.43767 9.31267 3.313 10.188C4.18833 11.0633 5.25067 11.5007 6.5 11.5Z"
                fill="#F3FF74"
              />
            </svg>
          </div>
          <PaginationComponent productLinks={productLinks} />
        </div>
        <svg
          width="504"
          height="454"
          viewBox="0 0 504 454"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -z-10 opacity-[0.15]">
          <path
            d="M352.666 221.463L459.373 36.9917L502.911 62.1583L371.29 289.917L207.455 195.542L87.4101 403.167H503.666V453.5H0.333496V0.5H50.6668V366.423L189.083 126.333L352.666 221.463Z"
            fill="url(#paint0_linear_3_45)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_3_45"
              x1="252"
              y1="0.5"
              x2="252"
              y2="453.5"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#2E2E2E" />
              <stop offset="1" stop-color="#606060" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
