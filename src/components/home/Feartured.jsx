"use client";

import React, { useEffect, useState } from "react";
import Container from "../Container";
import ProductBox from "../Product";

export default function Feartured() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category/laptops"
        );
        const data = await response.json();
        setProducts(data.products.slice(0, 5));
      } catch (err) {
        console.error("Failed to load featured products:", err);
      }
    }

    loadData();
  }, []);

  return (
    <div className="bg-gray-100 p-3">
      <Container>
        <h1 className="text-center text-2xl md:text-4xl font-bold">
          Featured Products
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


