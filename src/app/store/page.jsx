import React from "react";
import Container from "../../components/Container";
import { getCategories, getProducts } from "../../library";
import ProductBox from "../../components/Product";

export default function Storepage() {
  return (
    <Container className="grid grid-cols-1 lg:grid-cols-5 gap-3 mt-5">
      <CategoryListing />
      <ProductListing />
    </Container>
  );
}

const CategoryListing = async () => {
  const data = await getCategories();

  return (
    <div className="border rounded-lg p-3">
      <div className="text-lg sm:text-xl my-3 text-center font-semibold">
        Categories
      </div>
      <ul>
        {data.slice(0, 6).map((d) => (
          <li
            key={d._id}
            className="p-2 border my-2 rounded hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
          >
            {d.name.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductListing = async () => {
  const data = await getProducts();

  return (
    <div className="col-span-1 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-2">
      {data.map((d) => (
        <ProductBox key={d._id} product={d} />
      ))}
    </div>
  );
};
