import React, { useEffect, useState } from 'react';
import CommonLayout from '@/components/shop/common-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CheckoutPage from '@/components/common/checkout-page';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import useCartStore from '@/helpers/cart/cartStore';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import CheckoutLoader from '@/components/layouts/Bags/common/checkoutLoader';

const Checkout = () => {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'));
    const { t } = useTranslation();
    const router = useRouter();
    useEffect(() => {
        setCurrentUser(localStorage.getItem('user'))
    }, [localStorage.getItem('user')]);
    const {
        cartData,
        getCart
    } = useCartStore();
    useEffect(() => {

        if (!cartData) {
            toast.warn(t('your_cart_is_empty'));
            router.push('/products');
        }
        getCart();
    }, []);

    useEffect(()=>{

        if (router.query && router.query.status) {
            toast.error(t(router.query.status));
        }
    },[router.query])

    if (!cartData) {
        router.push('/products');
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        )
    }
    return (
        <>
            <Head>
                <title>{t("checkout")}</title>
            </Head>
            <CommonLayout parent={t("home")} title={t("checkout")}>
                <CheckoutPage />
            </CommonLayout>
        </>
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

export default Checkout;