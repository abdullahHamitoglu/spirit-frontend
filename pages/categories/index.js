import React, { useEffect, useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
import FilterPage from "@/components/shop/common/filter";
import ProductList from "@/components/shop/common/productList";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import { getCatagories, getFilterAttr, getProducts } from "@/controllers/productsController";
import { getPageData } from "@/controllers/homeController";
import useFilterStore from "@/helpers/filter/filterStore";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { Container, Media, Row, Col } from "reactstrap";
import Link from "next/link";


const MasterCollection = ({ img, totalProducts, type, about, link, btn }) => {
  return (
    <Col lg="3" md="6">
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
            <h3>{type}</h3>
            <p>{about}</p>
          </div>
        </div>
      </Link>
    </Col>
  );
};

const Collection = ({ categories }) => {
  return (
    <CommonLayout parent="home" title="collection">
      <section className="collection section-b-space ratio_square ">
        <Container>
          <Row className="partition-collection">
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
