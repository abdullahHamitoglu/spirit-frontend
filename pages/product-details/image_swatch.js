import React from "react";
import CommonLayout from "../../components/shop/common-layout";
import ImageSwatchPage from "./product/ImageSwatchPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { withApollo } from "../../helpers/apollo/apollo";

const ImageSwatch = () => {
  return (
    <CommonLayout parent="home" title="product">
      <ImageSwatchPage />
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

export default ImageSwatch;
