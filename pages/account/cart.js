import React from 'react';
import CommonLayout from '@/components/shop/common-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CartPage from '@/components/common/cart-page';
import useCartStore from '@/helpers/cart/cartStore';
import { useTranslation } from 'react-i18next';


const Wishliat = () => {
    const { cartLoading } = useCartStore();
    const {t} = useTranslation();
    return (
        <CommonLayout parent={t("home")} title={t("cart")}>
            <CartPage />
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