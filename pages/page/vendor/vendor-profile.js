import React from 'react';
import CommonLayout from '../../../components/shop/common-layout'
import ProfilePage from './common/profile';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import { withApollo } from '../../../helpers/apollo/apollo';

const VendorProfile = () => {
    return (
        <CommonLayout parent="home" title="Vendor Profile">
            <ProfilePage />
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
  
export default VendorProfile;