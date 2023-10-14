import React, { useEffect, useState } from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import CheckoutPage from './common/checkout-page';
import Login from '../../page/account/login-auth'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Checkout = () => {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'));
    useEffect(() => {
        setCurrentUser(localStorage.getItem('user'))
    }, [localStorage.getItem('user')])
    return (
        <>
            {currentUser !== null ?
                <CommonLayout parent="home" title="checkout">
                    <CheckoutPage />
                </CommonLayout>
                :
                <Login />
            }
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