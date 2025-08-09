import React from 'react';
import Container from "../Container";
import ProductBox from "../Product";

export default async function RecentlyAdded() {
  const response = await fetch("https://fakestoreapiserver.reactbd.org/api/products");
  const data = await response.json();

  return (
    <div className="p-3">
      <Container>
        <h1 className="text-center text-2xl md:text-4xl font-bold">
          Recently Added Products
        </h1>

        {/* Responsive grid layout */}
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {data.data.slice(0, 5).map((prod) => (
            <ProductBox key={prod._id} product={prod} />
          ))}
        </div>
      </Container>
    </div>
  );
}

