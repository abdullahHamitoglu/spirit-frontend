import React, { Fragment } from "react";
import HeaderOne from "../../../../components/headers/header-one";
import Slider from "react-slick";
import { Container, Row, Col } from "reactstrap";
import MasterBanner from "../../Fashion/Components/MasterBanner";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';

import "swiper/css";
import "swiper/css/navigation";

const Data = [
  {
    imgClass: "home34",
    title: "welcome to beauty",
    about: "beauty products",
    link: "#",
    btn: "shop now",
  },
  {
    imgClass: "home35",
    title: "save 30% off",
    about: "beauty products",
    link: "#",
    btn: "shop now",
  },
];

const Banner = ({ imgClass, title, about, btn }) => {
  return (
    <div>
      <div className={`home ${imgClass}`}>
        <Container>
          <Row>
            <Col>
              <div className="slider-contain">
                <div>
                  <h4>{title}</h4>
                  <h1>{about}</h1>
                  <a href={null} className="btn btn-solid">
                    {btn}
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
const MainBanner = (sliders) => {


  return (
    <Fragment>
      <title>Spirit | Beauty Store</title>
      <HeaderOne logoName={"layout3/logo.png"} topClass="top-header" />
      <section className="p-0">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="slide-1 home-slider"
        >
          {sliders.sliders.length && sliders.sliders.map((data, i) => {
            return (
              <SwiperSlide key={i}>
                <MasterBanner
                  key={i}
                  image={data.image_url}
                  desc={data.content}
                  title={data.title}
                  link={data.slider_path}
                  classes={data.classes}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </Fragment>
  );
};

export default MainBanner;
