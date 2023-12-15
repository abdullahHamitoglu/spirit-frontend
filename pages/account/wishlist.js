import React from 'react';
import CommonLayout from '@/components/shop/common-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import WishlistPage from '@/components/common/wishlist-page';
import useUserStore from '@/helpers/user/userStore';
import { useRouter } from 'next/router';
import { getWishlist } from '@/controllers/productsController';
import { parseCookies } from 'nookies';
import { useTranslation } from 'react-i18next';


const Wishlist = ({ wishListItems }) => {
    const { isAuthenticated, user } = useUserStore();
    const { locale } = useRouter();
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
    const { t } = useTranslation();
    return (
        <CommonLayout parent={t("home")} title={t("wishlist")}>
            <WishlistPage wishListItems={wishListItems} />
        </CommonLayout>
    )
}


export async function getServerSideProps(context) {
    // extract the locale identifier from the URL
    const { locale } = context;
    const { token } = parseCookies(context);
    const wishListItems = await getWishlist(locale, token);
    return {
        props: {
            wishListItems,
            ...(await serverSideTranslations(locale)),
        },
    }
}

export default Wishlist;