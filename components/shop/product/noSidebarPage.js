import React, { useEffect, useState, useRef } from "react";
import ProductTab from "../common/product-tab";
import Slider from "react-slick";

import { Row, Col, Container, Media } from "reactstrap";
import DetailsWithPrice from "../common/detail-price";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';


const NoSidebarPage = ({ pathId, product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  var data = product;

  return (
    <section>
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col sm="12" xs="12">
              <div className="container-fluid">
                {!data ||
                  !data ||
                  data.length === 0 ? (
                  t('loading')
                ) : (
                  <Row>
                    <Col lg="6" className="product-thumbnail">

                      <Swiper modules={[Thumbs]}  zoom={true} thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}} >
                        {data.images.map((vari, index) => (
                          <SwiperSlide key={index} className="d-flex justify-content-center">
                            <Media src={`${vari.large_image_url}`} alt={data.name} className="img-fluid image_zoom_cls-0" />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <Swiper
                        slidesPerView={3}
                        modules={[Thumbs]}
                        watchSlidesProgress
                        onSwiper={setThumbsSwiper}
                      >
                        {data.images
                          ? data.images.map((vari, index) => (
                            <SwiperSlide key={index} className="d-flex justify-content-center">
                              <Media
                                src={`${vari.small_image_url}`}
                                key={index}
                                alt={vari.alt}
                                className="img-fluid"
                              />
                            </SwiperSlide>
                          ))
                          : ''
                        }
                      </Swiper>
                    </Col>
                    <Col lg="6" className="rtl-text">
                      <DetailsWithPrice
                        item={data}
                      />
                    </Col>
                  </Row>
                )}
              </div>
              <ProductTab item={data} />
            </Col>
          </Row>
        </Container>
      </div>
    </section >

  );
};

export default NoSidebarPage;
