import React from "react";
import Slider from "react-slick";
import { Row, Col, Container } from "reactstrap";

import { Slider5 } from "../../../services/script";



const Instagram = ({ type }) => {
  var data = []
  return (
    <Container>
      <Row>
        <Col md="12">
          <h2 className="title-borderless"># instagram</h2>
          <Slider {...Slider5} className="slide-5 no-arrow slick-instagram">
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
  );
};

export default Instagram;
