import React, { useEffect, useState } from 'react';
import CommonLayout from '@/components/shop/common-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CheckoutPage from '@/components/common/checkout-page';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';

const Checkout = () => {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'));
    const { t } = useTranslation();
    useEffect(() => {
        setCurrentUser(localStorage.getItem('user'))
    }, [localStorage.getItem('user')])
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