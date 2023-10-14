import React from 'react';
import CommonLayout from '../../components/shop/common-layout';
// import { withApollo } from '../../helpers/apollo/apollo';
import { Row, Container } from 'reactstrap';
import ProductList from './common/productList';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const SixGrid = () => {
    return (
        <CommonLayout title="collection" parent="home" >
             <section className="section-b-space">
            <Container>
                <Row>
                    <ProductList colClass="col-lg-2 col-md-4 col-sm-6 col-grid-box" layoutList='' noSidebar={true} />
                </Row>
            </Container>
            </section>
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
  
export default SixGrid;