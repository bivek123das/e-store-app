import React from 'react'
import Slider from './Slider'
import Container from "../Container";
import styles from "../../styles/home/hero.module.css";
import Link from 'next/link';

export default function HeroSection() {
  return (
    <Container>
         <section className={`${styles.hero}`}>

          {/*Types Section*/}

            <div className={`${styles.textSection} text-gray-700`}>
              <h1>One stop solution <span className='text-pink-500'>E-Store</span></h1>
              <p>Discover the latest headphones, earphones, mobiles, tablets etc.</p>
              <p>Exclusive deals just for you!</p>
              <Link href={"/store"}><button className={styles.ctaButton}>Shop Now</button></Link>
            </div>
             
             {/*Image Slider Section*/}
               <Slider/>
         </section>
         
    </Container>
  )
}
