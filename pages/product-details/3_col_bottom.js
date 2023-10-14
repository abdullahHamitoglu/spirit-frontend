import React from "react";
import CommonLayout from "../../components/shop/common-layout";
import ProductSection from "./common/product_section";
// import { withApollo } from "../../helpers/apollo/apollo";
import ThreeColBottomPage from "./product/3_col_Bottom_page";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ThreeColBottom = () => {
  return (
    <CommonLayout parent="home" title="product">
      <ThreeColBottomPage />
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

export default ThreeColBottom;
