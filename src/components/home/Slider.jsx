"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/home/hero.module.css";
import Image from "next/image";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);

  // Fetch product images from DummyJSON
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        // Extract thumbnail images
        const productImages = data.products.map((p) => p.thumbnail);
        setImages(productImages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className={styles.imageSection}>
      <div className={styles.slider}>
        {images.map((image, index) => (
          <Image
            alt={`slide-${index}`}
            className={`${styles.slide} ${currentSlide === index ? styles.active : ""}`}
            key={index}
            src={image}
            fill
            sizes="100vw"
          />
        ))}
      </div>
    </div>
  );
}

