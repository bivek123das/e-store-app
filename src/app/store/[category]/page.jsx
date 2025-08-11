"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Container from "../../../components/Container";
import ProductBox from "../../../components/Product";

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!category) return;
    
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, [category]);

  return (
    <Container className="mt-5">
      <h1 className="text-2xl font-semibold text-center mb-4">
        {category.toUpperCase()} Products
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductBox key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found for this category.</p>
      )}
    </Container>
  );
}
