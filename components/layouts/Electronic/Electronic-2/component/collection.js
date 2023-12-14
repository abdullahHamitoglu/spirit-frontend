import React from "react";
import { Container, Media, Row, Col } from "reactstrap";

const Banner = ({ img, item, offer }) => {
  return (
    <Col md="4">
      <a href="#">
        <div className="collection-banner p-right text-end">
          <div className="img-part">
            <Media
              src={img}
              className="img-fluid blur-up lazyload bg-img"
              alt=""
            />
          </div>
          <div className="contain-banner banner-3">
            <div>
              <h4>{offer}</h4>
              <h2>{item}</h2>
            </div>
          </div>
        </div>
      </a>
    </Col>
  );
};

const Collection = ({data}) => {
  return (
    <section className="banner-padding banner-goggles ratio2_1">
      <Container>
        <Row className="partition3">
          {data.map((data, i) => {
            return (
              <Banner
                key={i}
                img={data.image}
                item={data.title}
                offer={data.offer}
              />
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Collection;
