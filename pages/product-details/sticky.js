import React from 'react';
import StickyPage from './product/sticky_page';
import CommonLayout from '../../components/shop/common-layout';
// import { withApollo } from '../../helpers/apollo/apollo'
import ProductSection from './common/product_section';
import ProductTab from './common/product-tab';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Sticky = () => {
    return (
        <CommonLayout parent="home" title="product">
            <StickyPage />
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

export default Sticky;