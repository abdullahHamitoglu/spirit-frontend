import React, { useContext, useEffect } from 'react';
import CommonLayout from '@/components/shop/common-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import useUserStore from '@/helpers/user/userStore';
import ProfilePage from '@/components/account/profile-page';
import ProfileLoader from '@/components/account/profileLoader';

const Profile = () => {
    const { user, isAuthenticated } = useUserStore(); // Use the useUser hook to access user data and functions
    // const {countries} = useContext(CatalogContext);
    const router = useRouter();
    if (!isAuthenticated) {
        router.push('/');
    }
    return (
        <CommonLayout parent="home" title="profile">
            {
                isAuthenticated && user ?
                    <ProfilePage userDetails={user} /> :
                    <ProfileLoader />
            }
        </CommonLayout>
    )
}

export async function getServerSideProps(context) { 
    // extract the locale identifier from the URL
    const { locale } = context

    return {
        props: {
            // pass the translation props to the page component
            ...(await serverSideTranslations(locale)),
        },
    }
}

export default Profile;