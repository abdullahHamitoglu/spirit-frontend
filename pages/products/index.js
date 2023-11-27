import React, { useEffect, useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row } from "reactstrap";
import FilterPage from "@/components/shop/common/filter";
import ProductList from "@/components/shop/common/productList";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import { getFilterAttr, getProducts } from "@/controllers/productsController";
import { getPageData } from "@/controllers/homeController";
import useFilterStore from "@/helpers/filter/filterStore";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

const index = ({ products, page, attributes }) => {
  if(!products){
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }
  const [sidebarView, setSidebarView] = useState(false);
  const { t } = useTranslation();

  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };
  return (
    <>
      <Head>
        <meta name="keywords" content={page.meta_keywords} />
        <meta name="description" content={page.meta_description} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={page.meta_title} />
        <meta property="og:url" content={page.url} />
        <meta property="og:image" content={page.image} />
        <meta property="og:image:alt" content={page.meta_title} />
        <meta property="og:description" content={page.meta_description} />
        <title>{page.meta_title}</title>
      </Head>
      <CommonLayout title={page.title} parent={t("home")}>
        <section className="section-b-space ratio_asos">
          <div className="collection-wrapper">
            <Container>
              <Row>
                <FilterPage
                  attributes={attributes}
                  sm="3"
                  sidebarView={sidebarView}
                  closeSidebar={() => openCloseSidebar(sidebarView)}
                />
                <ProductList
                  page={page}
                  colClass="col-xl-3 col-6 col-grid-box"
                  layoutList=""
                  openSidebar={() => openCloseSidebar(sidebarView)}
                  products={products}
                  attributes={attributes}
                />
              </Row>
            </Container>
          </div>
        </section>
      </CommonLayout>
    </>
  );
};
export async function getStaticProps(context) {
  const { locale, query } = context;
  const {token} = parseCookies(context);
  const products = await getProducts(locale, query , token);
  const attributes = await getFilterAttr(locale);
  const page = await getPageData(locale, "products");
  return {
    props: {
      page,
      products,
      attributes,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default index;
