import React, { useEffect, useState, useRef } from "react";
import ProductTab from "../common/product-tab";
import Slider from "react-slick";

import { Row, Col, Container, Media, Spinner } from "reactstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import currencyStore from "@/helpers/Currency/CurrencyStore";
import { getProductBySlug } from "@/controllers/productsController";
import SingleProductLoader from "@/components/layouts/Bags/common/singleProductLoader";


import DetailsWithPrice from "../common/detail-price";
const NoSidebarPage = ({ reviews, product }) => {
  const [productData, setProductData] = useState(product);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { t } = useTranslation();
  const { locale, query } = useRouter();
  const { selectedCurrency } = currencyStore();

  const updateData = async () => {
    setProductData([]);
    const productData = await getProductBySlug(locale, query.slug, selectedCurrency.code);
    setProductData(productData);
  };

  useEffect(() => {
    updateData();
  }, [locale])
  return (
    <section>
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col sm="12" xs="12">
              <div className="container-fluid">
                {!productData ||
                  !productData ||
                  productData.length === 0 ? (
                  <div className="d-flex justify-content-center">
                    <Spinner
                      color="#00c2b5"
                      style={{
                        color: '#00c2b5',
                        borderWidth: '.5rem',
                        height: '5rem',
                        width: '5rem'
                      }}
                    />
                  </div>
                ) : (
                  <Row>
                    <Col lg="6" className="product-thumbnail">
                      <Swiper modules={[Thumbs]} zoom={true} thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }} >
                        {productData.images.map((vari, index) => (
                          <SwiperSlide key={index} className="d-flex justify-content-center">
                            <Media src={`${vari.original_image_url}`} alt={productData.name} className="img-fluid large-image image_zoom_cls-0" />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <Swiper
                        slidesPerView={3}
                        modules={[Thumbs]}
                        watchSlidesProgress
                        onSwiper={setThumbsSwiper}
                      >
                        {productData.images && productData.images.length > 1
                          ? productData.images.map((vari, index) => (
                            <SwiperSlide key={index} className="d-flex justify-content-center">
                              <Media
                                src={`${vari.small_image_url}`}
                                key={index}
                                alt={vari.alt}
                                className="img-fluid small-image"
                              />
                            </SwiperSlide>
                          ))
                          : ''
                        }
                      </Swiper>
                    </Col>
                    <Col lg="6" className="rtl-text">
                      <DetailsWithPrice
                        item={productData}
                      />
                    </Col>
                  </Row>
                )}
              </div>
              <ProductTab item={productData} reviews={reviews} />
            </Col>
          </Row>
        </Container>
      </div>
    </section >

  );
};

export default NoSidebarPage;
