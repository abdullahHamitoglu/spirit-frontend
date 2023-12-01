import React from 'react';
import CommonLayout from '@/components/shop/common-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import WishlistPage from '@/components/common/wishlist-page';
import useUserStore from '@/helpers/user/userStore';
import { useRouter } from 'next/router';


const Wishliat = () => {
    const { isAuthenticated } = useUserStore();
    const router = useRouter();
    if (!isAuthenticated && !user) {
        router.push({
            pathname: "/account/login",
            locale,
            query: {
                redirectUrl: router.pathname,
            },
        });
    }
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