import React from "react";

import Slider from "react-slick";
import { Product5 } from "../../../services/script";
import { Container, Row, Col } from "reactstrap";



const Instagram = ({ type }) => {
  var data = []

  return (
    <section className="instagram ratio_square">
      <Container fluid={true}>
        <Row>
          <Col md="12" className="p-0">
            <h2 className="title-borderless"># instagram</h2>
            <Slider {...Product5} className="slide-5 no-arrow slick-instagram">
              {data &&
                data.instagram.map((data, i) => (
                  <div key={i}>
                    <a href={null}>
                      <div className="instagram-box">
                        <img
                          src={data.img}
                          className="bg-img"
                          alt="Avatar"
                          style={{ width: "100%" }}
                        />
                        <div className="overlay">
                          <i className="fa fa-instagram" aria-hidden="true"></i>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Instagram;
