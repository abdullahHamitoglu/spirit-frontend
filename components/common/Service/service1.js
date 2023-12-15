import React from "react";
import {
  svgFreeShipping,
  svgservice,
  svgoffer,
} from "../../../services/script";
import { Container, Row, Col } from "reactstrap";
import MasterServiceContent from "./MasterServiceConternt";
import { useTranslation } from "react-i18next";


const ServiceLayout = ({ sectionClass }) => {
  const { t } = useTranslation()
  const Data = [
    {
      link: svgFreeShipping,
      title: t("free_shipping"),
      service: "free shipping world wide",
    },
    {
      link: svgservice,
      title: "24 X 7 service",
      service: "online service for 24 x 7",
    },
    {
      link: svgoffer,
      title: "festival offer",
      service: "new online special festival offer",
    },
  ];
  return (
    <Container>
      <section className={sectionClass}>
        <Row>
          {Data.map((data, index) => {
            return (
              <Col md="4" className="service-block" key={index}>
                <MasterServiceContent
                  link={data.link}
                  title={data.title}
                  service={data.service}
                />
              </Col>
            );
          })}
        </Row>
      </section>
    </Container>
  );
};

export default ServiceLayout;
