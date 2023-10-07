import React from "react";
import { Container, Row, Col, Media } from "reactstrap";
const Data = [
  {
    img: "../../../public/assets/images/icon/service1.png",
    title: "free shipping",
    service:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. ",
  },
  {
    img: "../../../public/assets/images/icon/service2.png",
    title: "24 X 7 service",
    service:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
  {
    img: "../../../public/assets/images/icon/service3.png",
    title: "festival offer",
    service:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
  {
    img: "../../../public/assets/images/icon/service4.png",
    title: "online payment",
    service:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
];

const ServiceContent = ({ img, title, service }) => {
  return (
    <Col lg="3" md="6" className="service-block1">
      <Media src={img.src} alt="" />
      <h4>{title}</h4>
      <p>{service} </p>
    </Col>
  );
};
const Service = () => {
  return (
    <Container>
      <section className="service section-b-space  border-section border-top-0">
        <Row className="partition4 ">
          {Data.map((data, i) => {
            return (
              <ServiceContent
                key={i}
                img={data.img}
                title={data.title}
                service={data.service}
              />
            );
          })}
        </Row>
      </section>
    </Container>
  );
};

export default Service;
