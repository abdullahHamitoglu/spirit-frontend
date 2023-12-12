import React, { useEffect, useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getBrands } from "@/controllers/productsController";
import { getPageData } from "@/controllers/homeController";
import { Container, Media, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import Link from "next/link";
const MasterCollection = ({ img, totalProducts, type, about, link, btn }) => {

  return (
    <Col lg="2" md="6" xs="6">
      <Link href={link}>
        <div className="collection-block">
          <div>
            <Media
              src={img}
              onError={(e)=> e.target.src = '/assets/images/logos/brand-placeholder.png'}
              className="img-fluid blur-up lazyload bg-img"
              alt=""
            />
          </div>
          <div className="collection-content">
            <h4>{type}</h4>
          </div>
        </div>
      </Link>
    </Col>
  );
};
const Collection = ({ brands }) => {
  
  return (
    <CommonLayout parent="home" title="collection">
      <section className="collection section-b-space ratio_square ">
        <Container>
          <Row className="partition-collection">
            {brands && brands.map((data, i) => {
              return (
                <MasterCollection
                  key={i}
                  img={data.image}
                  type={data.label}
                  link={`/brands/${data.label.replace(' ' , '-').toLowerCase()}`}
                />
              );
            })}
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};
export async function getServerSideProps(context) {
  const { locale } = context;
  const brands = await getBrands(locale);
  const page = await getPageData(locale, "categories");
  return {
    props: {
      page,
      brands,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Collection;
