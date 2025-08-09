"use client";
import React from "react";
import Container from "../components/Container";

export default function ErrorPage() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <h1 className="text-center text-red-500 text-xl sm:text-2xl md:text-3xl font-semibold">
          Something Went Wrong!!
        </h1>
        <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">
          Please try refreshing the page or come back later.
        </p>
      </div>
    </Container>
  );
}

