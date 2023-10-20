import React, { useContext, useEffect } from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import ProfilePage from './common/profile-page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useUser } from '@/helpers/user/userContext';
import { Router, useRouter } from 'next/router';
import ContentLoader from 'react-content-loader';
import ProfileLoader from './common/profileLoader';
import { CatalogContext } from '@/helpers/catalog/catalogContext';
import useUserStore from '@/helpers/user/userZustand';

const Profile = () => {
    const { user ,isAuthenticated } = useUserStore(); // Use the useUser hook to access user data and functions
    // const {countries} = useContext(CatalogContext);
    const router = useRouter();
     console.log(isAuthenticated);
    if (!isAuthenticated) {
        router.push('/');
    }
    return (
        <CommonLayout parent="home" title="profile">
            {
                isAuthenticated && user ?
                <ProfilePage userDetails={user} /> :<ProfileLoader />
            }
        </CommonLayout>
    )
}


export async function getStaticProps(context) {
    // extract the locale identifier from the URL
    const { locale } = context;

    return {
        props: {
            // pass the translation props to the page component
            ...(await serverSideTranslations(locale)),
        },
    }
}

export default Profile;