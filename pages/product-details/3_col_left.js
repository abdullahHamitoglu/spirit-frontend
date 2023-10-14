import React from "react";
import { useRouter } from "next/router";
import CommonLayout from "../../components/shop/common-layout";
import ProductSection from "./common/product_section";
// import { withApollo } from "../../helpers/apollo/apollo";
import ThreeColLeftPage from "./product/3_col_left_page";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ThreeColLeft = () => {
  return (
    <CommonLayout parent="home" title="product">
      <ThreeColLeftPage />
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

export default ThreeColLeft;
