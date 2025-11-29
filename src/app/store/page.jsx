"use client";

import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import ProductBox from "../../components/Product";
import Link from "next/link";

export default function Storepage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showCategories, setShowCategories] = useState(false); // for mobile accordin

  // Fetch all categories on mount
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Fetch products
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Container className="grid grid-cols-1 lg:grid-cols-5 gap-3 mt-5 flex-1 min-h-0">
        {/* Category listing */}
        <div className="rounded-lg p-3 flex flex-col min-h-0">
          {/* Mobile accordion header */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="w-full flex justify-between items-center px-4 py-2 text-lg font-semibold bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none"
            >
              Categories
              <span
                className={`transform transition-transform duration-300 ${
                  showCategories ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {/* Mobile category list */}
            {showCategories && (
              <ul className="mt-3">
                {categories.map((category) => {
                  const rawName =
                    typeof category === "string"
                      ? category
                      : category.name || category.slug || "";

                  const slug = rawName.toLowerCase().replace(/\s+/g, "-");
                  const label = rawName.replace(/-/g, " ");

                  return (
                    <Link key={slug} href={`/store/${slug}`}>
                      <li className="p-2 border my-2 rounded cursor-pointer text-sm hover:bg-gray-100 hover:text-black">
                        {label}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Desktop always visible with independent scroll */}
          <div className="hidden lg:flex lg:flex-col lg:h-full lg:min-h-0">
            <div className="text-lg sm:text-xl my-3 text-center font-semibold flex-shrink-0">
              Categories
            </div>
            <ul className="overflow-y-auto flex-1 min-h-0 pr-2">
              {categories.map((category) => {
                const rawName =
                  typeof category === "string"
                    ? category
                    : category.name || category.slug || "";

                const slug = rawName.toLowerCase().replace(/\s+/g, "-");
                const label = rawName.replace(/-/g, " ");

                return (
                  <Link key={slug} href={`/store/${slug}`}>
                    <li className="p-2 border my-2 rounded cursor-pointer text-sm sm:text-base hover:bg-gray-100 hover:text-black">
                      {label}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Product listing with independent scroll */}
        <div className="col-span-1 lg:col-span-4 overflow-y-auto min-h-0 pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-2 pb-4">
            {products.map((product) => (
              <ProductBox key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

