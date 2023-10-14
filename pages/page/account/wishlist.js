import React from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import WishlistPage from './common/wishlist-page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const Wishliat = () => {
    return (
        <CommonLayout parent="home" title="wishlist">
            <WishlistPage />
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

export default Wishliat;