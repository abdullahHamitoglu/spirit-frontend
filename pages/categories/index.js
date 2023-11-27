import React, { useEffect, useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
import FilterPage from "@/components/shop/common/filter";
import ProductList from "@/components/shop/common/productList";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import { getCatagories, getFilterAttr, getProducts } from "@/controllers/productsController";
import { getPageData } from "@/controllers/homeController";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { Container, Media, Row, Col } from "reactstrap";
import Link from "next/link";

import Slider from "react-slick";

import { Product5 } from "@/services/script";

const MasterCollection = ({ img, totalProducts, type, about, link, btn }) => {

  return (
    <Col lg="2" md="6">
      <Link href={link}>
        <div className="collection-block">
          <div>
            <Media
              src={img}
              className="img-fluid blur-up lazyload bg-img"
              alt=""
            />
          </div>
          <div className="collection-content">
            <h4>{totalProducts}</h4>
            <h4>{type}</h4>
            {/* <p>{about}</p> */}
          </div>
        </div>
      </Link>
    </Col>
  );
};
const MasterCategory = ({ img, title, link }) => {
  return (
    <div className="category-block">
      <a href={`/categories/${link}`}>
        <div className="category-image">
          <Media src={img} alt="" />
        </div>
      </a>
      <div className="category-details">
        <Link href={`/categories/${link}`}>
          <h5>{title}</h5>
        </Link>
      </div>
    </div>
  );
};
const Collection = ({ categories }) => {
  return (
    <CommonLayout parent="home" title="collection">
      <section className="collection section-b-space ratio_square ">
        <Container>
          <Row className="partition-collection">
            {/* <Col>
              <Slider {...Product5} className="slide-6 no-arrow">
                {categories.map((data, i) => {
                  return (
                    <MasterCategory
                      key={i}
                      img={data.category_icon_path}
                      link={data.slug}
                      title={data.name}
                    />
                  );
                })}
              </Slider>
            </Col> */}
            {categories && categories.map((data, i) => {
              return (
                <MasterCollection
                  key={i}
                  img={data.image_url}
                  type={data.name}
                  about={data.description}
                  link={`/products?category_id=${data.id}`}
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
  const { locale, params } = context;
  const { token } = parseCookies(context);
  const categories = await getCatagories(locale, token);
  const page = await getPageData(locale, "categories");
  return {
    props: {
      page,
      categories,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Collection;
