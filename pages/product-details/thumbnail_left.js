import React from 'react';
import CommonLayout from '../../components/shop/common-layout';
import LeftImagePage from './product/leftImagePage';
// import { withApollo } from '../../helpers/apollo/apollo';
import ProductTab from './common/product-tab';
import ProductSection from './common/product_section';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ThumbnailLeft = () => {
    return (
        <CommonLayout parent="home" title="product">
            <LeftImagePage />
            <ProductTab />
            <ProductSection />
        </CommonLayout>
    )
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
  
export default ThumbnailLeft; 