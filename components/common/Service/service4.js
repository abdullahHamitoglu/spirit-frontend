import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import {
  svgFastEfficient,
  svgFreeShipping,
  svgpayment,
  svgservice,
} from "../../../services/script";
import MasterServiceContent from "./MasterServiceConternt";
import { useTranslation } from "react-i18next";
import { coreConfigFrontField } from "@/controllers/homeController";
import { useRouter } from "next/router";


const Service = () => {
  const { t } = useTranslation();
  const [phone, setPhone] = useState([]);
  const { locale } = useRouter()
  useEffect(() => {
    const getPhone = async (params) => {
      const response = await coreConfigFrontField(locale, "config.show.frontend.phone");

      setPhone(response);
    }
    getPhone()
  }, [phone,])
  const Data = [
    {
      link: svgFreeShipping,
      title: t("free_shipping"),
      service: t('free_shipping_desc'),
      href: '/page/terms-of-usage-return/'
    },
    {
      link: svgpayment,
      title: t("cash_delivery"),
      service: t("cash_delivery_desc"),
      href: '/page/about-us'
    },
    {
      link: svgservice,
      title: t("contact_pharmacy"),
      service:  phone.value && t("contact_pharmacy_desc").replace('PHONE', phone.value ),
      href: `tel:${phone.value}`
    },
    {
      link: svgFastEfficient,
      title: t("branches_pharmacy"),
      service: t("branches_pharmacy_desc"),
      href: '/branches'
    },
  ];
  return (
    <Container>
      <section className="service small-section pb-0">
        <Row className="partition4">
          {Data.map((data, index) => {
            return (
              <Col
                lg="3"
                xs="6"
                className={`service-block1`}
                key={index}
              >
                <MasterServiceContent
                  title={data.title}
                  link={data.link}
                  service={data.service}
                  href={data.href}
                  marijuana={true}
                />
              </Col>
            );
          })}
        </Row>
      </section>
    </Container>
  );
};
export default Service;