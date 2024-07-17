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

const PaginationComponent = ({ productLinks }) => {
  const [products, setProducts] = useState([]);
  const productsPerPage = 28;

  const totalPages = Math.ceil(productLinks.length / productsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderProductsForCurrentPage = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return productLinks
      .slice(startIndex, endIndex)
      .map((product) => <ProductCard item={product} key={product.name} />);
  };

  const renderPaginationLinks = () => {
    const maxPagesToShow = 5;

    let pagesToRender = [];

    if (totalPages <= maxPagesToShow) {
      pagesToRender = Array.from({ length: totalPages }, (_, i) => (
        <PaginationItem
          key={i + 1}
          className={
            currentPage === i + 1
              ? "bg-white text-black fond-semibold rounded-md"
              : ""
          }>
          <PaginationLink onClick={() => handlePageChange(i + 1)} page={i + 1}>
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ));
    } else {
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxPagesToShow / 2)
      );
      const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

      for (let i = startPage; i <= endPage; i++) {
        pagesToRender.push(
          <PaginationItem
            key={i}
            className={currentPage === i ? "bg-blue-500" : ""}>
            <PaginationLink onClick={() => handlePageChange(i)} page={i}>
              {i}
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
        <div
          id="grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 rounded mt-4">
          {renderProductsForCurrentPage()}
        </div>
        <div className="flex flex-row py-6">
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
          )}
          {renderPaginationLinks()}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          )}
        </div>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
