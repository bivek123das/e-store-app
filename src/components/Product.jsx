import React from "react";
import styles from "../styles/home/product.module.css";
import Link from "next/link";
import Image from "next/image";
import ProductCartButton from "./ProductCartButton"; // Client component

export default function ProductBox({ product }) {
  return (
    <div
      className={`${styles.card} bg-white m-1 p-4 rounded-lg shadow-lg transition-transform `}
    >
      <Link href={`/store/product-details/${product.id}`}>
        <div className="relative w-full h-[250px] sm:h-[280px] md:h-[300px]">
          <Image
             src={product.thumbnail }
            alt={product.title}
            fill
            className="object-contain rounded-md"
          />
        </div>
      </Link>
      <div className="mt-4">
        <h3 className="text-sm sm:text-base min-h-[60px] font-semibold text-gray-800 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-gray-900 font-semibold mt-2 text-sm sm:text-base">
        ₹{(product.price * 83).toFixed(0)}
        </p>

        {/* Client-rendered Add to Cart button */}
        <ProductCartButton product={product} showMessage={false} />
      </div>
    </div>
  );
}


