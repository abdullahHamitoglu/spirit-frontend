import React from "react";
import { Container, Row, Media, Col } from "reactstrap";
import lookbook from "assets/images/lookbook.jpg";
import two from "assets/images/pro3/2.jpg";
import one from "assets/images/pro3/1.jpg";
import lookbook2 from "assets/images/lookbook2.jpg";
import twentyseven from "assets/images/pro3/27.jpg";
import twentyeight from "assets/images/pro3/28.jpg";
import CommonLayout from "../../components/shop/common-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const LookBookDot = ({ img, title, price, num, details, classes, link }) => {
  return (
    <div className={classes}>
      <span>{num}</span>
      <a href={link}>
        <div className="dot-showbox">
          <Media src={img} className="img-fluid blur-up lazyload" alt="" />
          <div className="dot-info">
            <h5 className="title">{title}</h5>
            <h5>{price}</h5>
            <h6>{details}</h6>
          </div>
        </div>
      </a>
    </div>
  );
};

const Lookbook = () => {
  return (
    <CommonLayout parent="home" title="lookbook">
      <section className="lookbook section-b-space ratio_square">
        <Container>
          <Row>
            <Col md="6">
              <div className="lookbook-block">
                <div>
                  <Media
                    src={'/assets/images/lookbook.jpg'}
                    className="img-fluid blur-up lazyload bg-img"
                    alt=""
                  />
                </div>
                <LookBookDot
                  img={'/assets/images/pro3/2.jpg'}
                  num={"1"}
                  title="tee"
                  details="details"
                  classes="lookbook-dot"
                  price="200$"
                  link="#"
                />
                <LookBookDot
                  img={'/assets/images/pro3/1.jpg'}
                  num={"2"}
                  title="tee"
                  details="details"
                  classes="lookbook-dot dot2"
                  price="200$"
                  link="#"
                />
              </div>
            </Col>
            <Col md="6">
              <div className="lookbook-block">
                <div>
                  <Media
                    src={'/assets/images/lookbook2.jpg'}
                    className="img-fluid blur-up lazyload bg-img"
                    alt=""
                  />
                </div>
                <LookBookDot
                  img={'/assets/images/pro3/27.jpg'}
                  num={"1"}
                  title="tee"
                  details="details"
                  classes="lookbook-dot dot3"
                  price="200$"
                  link="#"
                />
                <LookBookDot
                  img={'/assets/images/pro3/28.jpg'}
                  num={"2"}
                  title="tee"
                  details="details"
                  classes="lookbook-dot dot4"
                  price="200$"
                  link="#"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};


export async function getStaticProps(context) {
  // extract the locale identifier from the URL
  const { locale } = context

  return {
    props: {
      // pass the translation props to the page component
      ...(await serverSideTranslations(locale)),
    },
  }
}

export default Lookbook;
