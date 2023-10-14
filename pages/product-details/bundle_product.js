import React from "react";
import CommonLayout from "../../components/shop/common-layout";
import ProductSection from "./common/product_section";
// import { withApollo } from "../../helpers/apollo/apollo";
import BundleProductPage from "./product/bundle_page.js";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const BundleProduct = () => {
  return (
    <CommonLayout parent="home" title="product">
      <BundleProductPage />
      <ProductSection />
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

export default BundleProduct;
