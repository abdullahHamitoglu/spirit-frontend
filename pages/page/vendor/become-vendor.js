import React from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import Become from './common/become';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const BecomeVendor = () => {
    return (
        <CommonLayout parent="home" title="Become vendor">
            <Become />
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
  
export default BecomeVendor;