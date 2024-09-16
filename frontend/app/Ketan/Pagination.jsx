"use client";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import ProductCard from "@/app/ketan/ProductCard";
import store from "@/lib/zustand";
import Loading from "./Loading";

const PaginationComponent = () => {
  const [products, setProducts] = useState(false);
  const { setArr, arr, loading } = store();
  const getData = async (page) => {
    setProducts(false)
    const data = await fetch(`http://localhost:5000/api/price?p=${page}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const res = await data.json();
    console.log(res);
setArr(res);
setProducts(true)  
};

  const productsPerPage = 25;

  const totalPages = Math.ceil(1700 / productsPerPage);

  const getProductsForPage = (currentPage) => {
    getData(currentPage);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);


  const renderPaginationLinks = () => {
    const maxPagesToShow = 5; // Adjust this based on your preference

    let pagesToRender = [];

    if (totalPages <= maxPagesToShow) {
      // If total pages are less than or equal to maxPagesToShow, render all pages
      pagesToRender = Array.from({ length: totalPages }, (_, i) => (
        <PaginationItem key={i + 1}>
          <PaginationLink onClick={() => handlePageChange(i + 1)} page={i + 1}>
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ));
    } else {
      // Render pages with ellipsis
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxPagesToShow / 2)
      );
      const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

      for (let i = startPage; i <= endPage; i++) {
        pagesToRender.push(
          <PaginationItem key={i}>
            <PaginationLink onClick={() => handlePageChange(i)} page={i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (startPage > 1) {
        pagesToRender.unshift(
          <PaginationItem key={1}>
            <PaginationLink onClick={() => handlePageChange(1)} page={1}>
              1
            </PaginationLink>
          </PaginationItem>
        );
        if (startPage > 2) {
          pagesToRender.unshift(
            <PaginationItem key="ellipsis-start">
              <span className="text-white">...</span>
            </PaginationItem>
          );
        }
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pagesToRender.push(
            <PaginationItem key="ellipsis-end">
              <span className="text-white">...</span>
            </PaginationItem>
          );
        }
        pagesToRender.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              onClick={() => handlePageChange(totalPages)}
              page={totalPages}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return pagesToRender;
  };

  return (
    <Pagination>
      <PaginationContent className="text-white flex flex-col px-6 md:px-12 lg:px-24">
        <div id='grid' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12  rounded mt-4">
          {!loading?products?arr.length!==0?arr.map((product) => (
            <ProductCard item={product} key={product._id} />
          )):<div className=" col-span-3"><Loading/></div>:<div className=" col-span-3"><Loading></Loading></div>:<div className=" col-span-3"><Loading></Loading></div>}
        </div>
        <div className="flex flex-row py-6 ">
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                handlePageChange(
                  currentPage > 1 ? currentPage - 1 : currentPage
                )
              }
            />
          </PaginationItem>
          {renderPaginationLinks()}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                handlePageChange(
                  currentPage < totalPages ? currentPage + 1 : currentPage
                )
              }
            />
          </PaginationItem>
        </div>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
