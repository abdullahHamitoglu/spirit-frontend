import React, { useEffect, useState, useRef } from "react";
import ProductTab from "../common/product-tab";
import Slider from "react-slick";

import { Row, Col, Container, Media } from "reactstrap";
import ImageZoom from "../common/image-zoom";
import DetailsWithPrice from "../common/detail-price";



const NoSidebarPage = ({ pathId, product }) => {
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();
  var data = product;
  const isRtl = document.dir == 'rtl' ? true : false;
  var products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    rtl: isRtl,
  };
  var productsnav = {
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    rtl: isRtl,
  };


  const changeColorVar = (img_id) => {
    slider2.current.slickGoTo(img_id);
  };

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, [data]);

  const { nav1, nav2 } = state;

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
                      <Slider
                        {...products}
                        asNavFor={nav2}
                        ref={(slider) => (slider1.current = slider)}
                        className="product-slick"
                      >
                        {data.images.map((vari, index) => (
                          <div key={index} className="d-flex justify-content-center">
                            <Media src={`${vari.large_image_url}`} alt={data.name} className="img-fluid image_zoom_cls-0" />
                          </div>
                        ))}
                      </Slider>
                      <Slider
                        className="slider-nav"
                        {...productsnav}
                        asNavFor={nav1}
                        ref={(slider) => (slider2.current = slider)}
                      >
                        {data.variants
                          ? data.images.map((vari, index) => (
                            <div key={index} className="d-flex justify-content-center">
                              <Media
                                src={`${vari.small_image_url}`}
                                key={index}
                                alt={vari.alt}
                                className="img-fluid"
                              />
                            </div>
                          ))
                          : ''
                        }
                      </Slider>
                    </Col>
                    <Col lg="6" className="rtl-text">
                      <DetailsWithPrice
                        changeColorVar={changeColorVar}
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
    </section>

  );
};

export default NoSidebarPage;
