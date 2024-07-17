"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../../ketan/ProductCard";

function ProductPage({ params: id }) {
  const [products, setProducts] = useState([]);
  const [others, setOthers] = useState([]);
  const getData = async (page) => {
    const data = await fetch(
      `https://insightify-9q0p.onrender.com/api/price/fetch/${id.id}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const products = await data.json();
    console.log(products);
    setProducts(products.product);
    setOthers(products.others);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="-z-30 bg-zinc-950  text-white min-h-screen py-8 md:py-16 px-6 md:px-12 lg:px-24 ">
      <div className="flex gap-5 flex-row p-4 relative justify-center rounded-md items-center bg-zinc-900">
        <h3 className=" py-1 px-2 rounded-lg bg-indigo-800 absolute top-5 right-5 text-sm">
          {products.brand}
        </h3>
        <div className="flex w-1/3 justify-center items-center bg-slate-100 rounded-md p-3">
          <img
            src={products.images ? products.images[0] : ""}
            alt={products.name}
            className=" max-h-[30vh] rounded-md"
          />
        </div>
        <div className="w-full mt-8 flex-1">
          <h2 className="text-2xl font-bold mb-2">{products.name}</h2>
          <h2 className="text-sm mb-2">{products.description}</h2>
          <div className="flex flex-row w-full justify-between items-center px-4 py-6 ">
            <p className="text-md font-bold mb-2">
              ₹{products ? parseFloat(products.price).toFixed(2) : ""}
            </p>
            <a
              href={products.link}
              className=" py-2 px-3 bg-zinc-600 hover:bg-zinc-700 transition-all rounded-sm"
              target="blank">
              Visit Product
            </a>
          </div>
        </div>
      </div>
      <h1 className=" py-6 text-xl font-semibold">View other products</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 ">
        {others.map((item) => {
          return <ProductCard item={item} />;
        })}
      </div>
    </div>
  );
}

export default ProductPage;
