import React from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import Dashboard from './common/dashboard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const VendorDashboard = () => {
    return (
        <CommonLayout parent="home" title="vendor dashboard">
            <Dashboard />
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
  
export default VendorDashboard;