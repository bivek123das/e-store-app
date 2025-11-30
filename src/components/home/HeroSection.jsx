import React from 'react'
import Slider from './Slider'
import Container from "../Container";
import styles from "../../styles/home/hero.module.css";
import Link from 'next/link';

export default function HeroSection() {
  return (
    <Container className={"min-w-[80vw]"}>
         <section className={`${styles.hero}`}>
            <div className={`${styles.textSection} text-gray-700`}>
              <h1>One stop solution <span className='text-pink-500'>E-Store</span></h1>
              <p>Discover the latest cosmetics, laptops, mobiles, tablets etc.</p>
              <p>Exclusive deals just for you!</p>
              <Link href={"/store"}><button className={styles.ctaButton}>Shop Now</button></Link>
            </div>
                {/* FIX: Wrap Slider inside imageSection */}
     
               <Slider /> 
         </section>
         
         </Container>
  )
}
