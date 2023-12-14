import Link from 'next/link';
import React from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const CategoriesSlider = ({ categories }) => {
  console.log(categories.items);
  return (
    <div>
      <Link href={categories.path} className="my-5 d-block">
        <div className='title1'>
          <h2 className='title-inner1'>{categories.title}</h2>
        </div>
        {categories.image &&
          <Media className="mw-100" src={categories.image} alt={categories.title} />
        }
      </Link>
      <Swiper
        spaceBetween={15}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
      >
        {categories && categories.items && categories.items.map((item, index) => (
          <SwiperSlide key={index}>
            <Link href={`/categories/${item.slug}`}>
              <img className='mw-100' src={item.image_url} alt={item.name} onError={(e) => e.target.src = '/assets/images/logos/brand-placeholder.png'} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoriesSlider;
