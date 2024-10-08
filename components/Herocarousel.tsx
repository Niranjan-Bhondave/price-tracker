"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";
const heroImages = [
    {imgUrl: 'assets/images/hero-1.svg', alt: 'smartWatch'},
    {imgUrl: 'assets/images/hero-2.svg', alt: 'bag'},
    {imgUrl: 'assets/images/hero-3.svg', alt: 'lap'},
    {imgUrl: 'assets/images/hero-4.svg', alt: 'air-fryer'},
    {imgUrl: 'assets/images/hero-5.svg', alt: 'chair'},

]
const Herocarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel showThumbs = {false} 
      //autoPlay infiniteLoop interval={2000} 
      showArrows = {false} showStatus = {false}>
        {
            heroImages.map((image) =>(
                <Image src={image.imgUrl} alt={image.alt} key={image.alt} className="object-contain" width={484} height={484} />
            ))
        }            
    </Carousel> 
        <Image src="/assets/icons/hand-drawn-arrow.svg" alt="arrow" width={175} height={175} className="max:xl-hidden absolute -left1-[15%] bottom-0"/>
    </div>
  )
}

export default Herocarousel
