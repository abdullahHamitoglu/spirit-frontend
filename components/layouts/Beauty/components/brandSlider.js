import Link from 'next/link';
import React from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const BrandSlider = ({ brands }) => {
  const breakpoints = {
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 7,
    },
  };

  return (
    <div>
      <Swiper
        spaceBetween={15}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={breakpoints}
      >
        {brands.map((brand, index) => (
          <SwiperSlide key={index}>
            <Link href={`/brands/${brand.brand_name.replace(' ', '-').toLowerCase()}`}>
              <img className='mw-100' src={brand.brand_image} alt={brand.brand_name} onError={(e) => e.target.src = '/assets/images/logos/brand-placeholder.png'} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandSlider;
