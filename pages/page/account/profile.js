import React, { useEffect } from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import ProfilePage from './common/profile-page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useUser } from '@/helpers/user/userContext';
import { Router, useRouter } from 'next/router';
import ContentLoader from 'react-content-loader';

const Profile = () => {
    const { state, fetchUserData } = useUser(); // Use the useUser hook to access user data and functions
    const router = useRouter();
    if (state.isAuthenticated && !state.user) {
        fetchUserData();
        router.reload();
    }
    if (!localStorage.getItem('token')) {
        router.push('/');
    }
    return (
        <CommonLayout parent="home" title="profile">
            {
                state.isAuthenticated && state.user &&
                <ProfilePage userDetails={state.user} />
            }
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

export default Profile;