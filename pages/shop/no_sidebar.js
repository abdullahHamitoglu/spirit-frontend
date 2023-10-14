import React from 'react';
import CommonLayout from '../../components/shop/common-layout';
// import { withApollo } from '../../helpers/apollo/apollo';
import ProductList from './common/productList';
import { Container, Row } from 'reactstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const NoSidebar = () => {
    return (
        <CommonLayout title="collection" parent="home" >
            <section className="section-b-space ratio_asos">
                <div className="collection-wrapper">
                    <Container>
                        <Row>
                            <ProductList colClass="col-xl-3 col-6 col-grid-box" noSidebar={true} />
                        </Row>
                    </Container>
                </div>
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


export default NoSidebar;