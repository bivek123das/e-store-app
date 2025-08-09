"use client";

import React, { useEffect,useState } from 'react';
import styles from "../../styles/home/hero.module.css";
import Image from 'next/image';

const images = [
  "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png",
  "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
  "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png",
  "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png",
  "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png",
];




export default function Slider() {

  const [curretSlide,setCurrentSlide] = useState(0);

  useEffect(()=>{
      const interval = setInterval(()=>{
            setCurrentSlide(
              (currentValue)=>{
                     if(currentValue == images.length - 1){
                      return 0
                     }else{
                      return currentValue + 1;
                     }
            })
      },2000)

      return ()=> { 
        clearInterval(interval) // cleanip - unmounting
      }
  },[])
  return (
    <div className={styles.imageSection}>
          <div className={styles.slider}>
               {
                images.map((image,index)=>(
                  <Image alt={"slide" + index} className={`${styles.slide} ${curretSlide=== index && styles.active}`} key={index} src={image} fill/>
                ))
               }
          </div>
    </div>
  )
}
