import React from "react";
import Container from "../../../../components/Container";
import Image from "next/image";
import Link from "next/link";
import ProductCartButton from "../../../../components/ProductCartButton";

export default async function ProductDetails({ params }) {
  // Fetch single product from DummyJSON
  const res = await fetch(`https://dummyjson.com/products/${params.product_id}`);
  const productFromDummy = res.ok ? await res.json() : null;

  const product = {
    ...(productFromDummy || {})
  };

  return (
    <Container>
      <div className="py-5 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center bg-white rounded-lg shadow-md overflow-hidden">
          {/* Product Image */}
          <div className="w-full md:w-1/2 h-[400px] sm:h-[500px] md:h-[680px] relative">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover rounded-md"
            />
          </div>

          {/* Product Details */}
          <div className="p-4 sm:p-6 md:w-1/2">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
              {product.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              {product.description}
            </p>
            <p className="text-lg font-semibold text-gray-900 mb-4">
              Price: ${product.price}
            </p>
            <ul className="text-sm sm:text-base text-gray-700 space-y-2">
              <li>
                <strong>Category:</strong> {product.category}
              </li>
              {product.brand && (
                <li>
                  <strong>Brand:</strong> {product.brand}
                </li>
              )}
            </ul>

            {/* Cart & Buy Now Buttons */}
           <ProductCartButton product={product}/>

            {/* Go to Store Button */}
            <Link href="/store">
              <button className="mt-4 w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
                Go to Store
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}





