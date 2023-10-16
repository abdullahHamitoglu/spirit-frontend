import React from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import ProfilePage from './common/profile-page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useUser } from '@/helpers/user/userContext';

const Profile = () => {
    const {state} = useUser()
    return (
        <CommonLayout parent="home" title="profile">
            <ProfilePage user={state.user} />
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