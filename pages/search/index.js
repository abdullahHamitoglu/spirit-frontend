import React, { useEffect, useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row } from "reactstrap";
import FilterPage from "@/components/shop/common/filter";
import ProductList from "@/components/shop/common/productList";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import { getCatagories, getFilterAttr, getProducts, searchProducts } from "@/controllers/productsController";
import { getPageData } from "@/controllers/homeController";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import MasterCategory from "@/components/common/Collections/categoryCard";

// Import Swiper styles
import 'swiper/css';
import useUserStore from "@/helpers/user/userStore";
const Products = (context) => {
  const { products, page, attributes, currency } = context;
  if (!products) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }
  const [sidebarView, setSidebarView] = useState(false);

  const router = useRouter();
  const { locale } = useRouter();

  const [productsData, setProductsData] = useState(products.data);

  const { t } = useTranslation();
  // const { token } = useUserStore();
  const { token, currencyCode } = parseCookies(context);


  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };
  const handelCategory = async (id) => {
    const response = await getProducts(locale, { ...router.query, category_id: id }, token);
    if (response.length > 0) {
      setProductsData((prevData) => [...prevData, ...response]);
    }
  }

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
                  getProducts={getProducts}
                  setProductsData={setProductsData}
                  sm="3"
                  sidebarView={sidebarView}
                  closeSidebar={() => openCloseSidebar(sidebarView)}
                />
                <ProductList
                  page={page}
                  colClass="col-xl-3 col-6 col-grid-box"
                  getProducts={getProducts}
                  layoutList=""
                  openSidebar={() => openCloseSidebar(sidebarView)}
                  products={products}
                  productsData={productsData}
                  setProductsData={setProductsData}
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
export async function getServerSideProps(context) {
  const { locale, query } = context;
  const { token, currencyCode } = parseCookies(context);
  const attributes = await getFilterAttr(locale, query);
  const page = await getPageData(locale, "search");
  const products = await searchProducts(locale, query, token, currencyCode, query.key);

  // if (!products.data) {
  //   return {
  //     notFound: true
  //   }
  // }
  return {
    props: {
      page,
      products,
      attributes,
      ...(await serverSideTranslations(locale)),
    },
  };

}

export default Products;
