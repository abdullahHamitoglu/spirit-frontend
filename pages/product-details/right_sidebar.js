import React from 'react';
import CommonLayout from '../../components/shop/common-layout';
import ProductSection from './common/product_section';
// import { withApollo } from '../../helpers/apollo/apollo';
import RightSidebarPage from './product/rightSidebarPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const LeftSidebar = () => {

  return (
    <CommonLayout parent="home" title="product">
        <RightSidebarPage />
      <ProductSection />
    </CommonLayout>
  );
}


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

export default LeftSidebar;