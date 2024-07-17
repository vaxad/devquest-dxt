"use client";

import { useState } from "react";
import Link from "next/link";
import store from "@/lib/zustand";

const ProductCard = ({ item }) => {
  const [up, setup] = useState(false);
  const { add } = store();
  return (
    <div className="max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div className="bg-[#181818] p-4 rounded-2xl overflow-clip" id="card">
        <div
          onMouseOver={() => setup(true)}
          onMouseLeave={() => setup(false)}
          className="w-full h-[30vh] relative flex rounded-md bg-slate-100 gap-3 flex-col sm:flex-row justify-center items-center p-3 overflow-clip">
          <h3 className="py-1 px-2 rounded-lg z-50 bg-zinc-900 absolute top-2 left-2 text-xs">
            {item.brand}
          </h3>
          <h3
            onClick={() => {
              add(item);
            }}
            className="py-1 px-2 cursor-pointer rounded-lg z-50 bg-red-900 absolute top-2 right-2 text-xs"
            style={{ zIndex: 10 }}>
            {"Pin"}
          </h3>
          <img
            src={item.images[0]}
            className="w-fit h-full"
            alt={item.name}></img>
        </div>
        <br />
        <h3 className="text-xl text-white font-bold mb-2">{item.name}</h3>
        <div className="flex flex-row w-full justify-between items-center">
          <p className="text-white text-lg font-semibold">
            ₹{item ? parseFloat(item.price).toFixed(2) : ""}
          </p>
          <Link
            href={`/product/${item._id}`}
            className="hover:bg-neutral-700 px-3 py-2 rounded-2xl transition-all text-white"
            style={{ zIndex: 10 }}>
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
