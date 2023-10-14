import React from 'react';
import CommonLayout from '../../components/shop/common-layout';
// import { withApollo } from '../../helpers/apollo/apollo';
import ProductTab from './common/product-tab';
import ProductSection from './common/product_section';
import RightImagePage from './product/rightImagePage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ThumbnailRight = () => {
    return (
        <CommonLayout parent="home" title="product">
            <RightImagePage />
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

export default ThumbnailRight; 