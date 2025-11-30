"use client";

import React, { useEffect, useState } from "react";
import Container from "../Container";
import ProductBox from "../Product";

export default function RecentlyAdded() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category/smartphones"
        );
        const data = await response.json();
        setProducts(data.products.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch recently added products:", error);
      }
    }

    loadData();
  }, []);

  return (
    <div className="p-3">
      <Container>
        <h1 className="text-center text-2xl md:text-4xl font-bold">
          Recently Added Products
        </h1>

        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {products.map((prod) => (
            <ProductBox key={prod.id} product={prod} />
          ))}
        </div>
      </Container>
    </div>
  );
}


