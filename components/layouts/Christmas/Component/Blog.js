import React from "react";
import Slider from "react-slick";
import { Col, Container, Media, Row } from "reactstrap";
import { Slider3 } from "../../../../services/script";

import Link from "next/link";
import Image from "next/image";




const Data = [
  {
    img: "public/assets/images/christmas/testimonial/1.jpg",
    name: "mark jecno",
    post: "designer",
    about:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration dummy text .",
  },
  {
    img: "public/assets/images/christmas/testimonial/1.jpg",
    name: "mark jecno",
    post: "designer",
    about:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration dummy text .",
  },
];

const BlogSlider = ({ img, name, post, about }) => {
  return (
    <div>
      <div className="review-content">
        <div className="avtar">
          <Media src={img.src} alt="" />
        </div>
        <h5>{name}</h5>
        <h6>{post}</h6>
        <p>{about}</p>
      </div>
    </div>
  );
};

const BlogSection = ({ type }) => {
  var data  = []
  return (
    <section className="blog-section grey-bg section-b-space">
      <Container>
        <Row>
          <Col lg="9">
            <div className="title2 text-start">
              <h2 className="title-inner1">from the blog</h2>
            </div>
            <Slider {...Slider3} className="slide-3 no-arrow ">
              {data &&
                data.blog.slice(0, 7).map((item, index) => (
                  <Col key={index}>
                    <Link href={`/blogs/blog_detail`}>
                      <div className="classic-effect">
                        <Media src={item.img} className="img-fluid" alt="" />
                        <span></span>
                      </div>
                    </Link>
                    <div className="blog-details">
                      <h4>{item.title}</h4>
                      <Link href={`/blogs/blog_detail`}>
                        <p>{item.desc} </p>
                      </Link>
                      <hr className="style1" />
                      <h6>by: {item.date}</h6>
                    </div>
                  </Col>
                ))}
            </Slider>
          </Col>
          <Col lg="3">
            <div className="review-box">
              <Slider className="slide-1">
                {Data.map((data, i) => {
                  return (
                    <BlogSlider
                      key={i}
                      img={data.img}
                      name={data.name}
                      post={data.post}
                      about={data.about}
                    />
                  );
                })}
              </Slider>
              <div className="santa-img">
                <img src="/assets/images/christmas/testimonial/santa.png" alt="" className="img-fluid" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default BlogSection;
