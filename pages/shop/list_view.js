import React from 'react';
import CommonLayout from '../../components/shop/common-layout';
// import { withApollo } from '../../helpers/apollo/apollo';
import { Row, Container } from 'reactstrap';
import ProductList from './common/productList';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ListView = () => {

    return (
        <CommonLayout title="collection" parent="home" >
            <section className="section-b-space">
                <Container>
                    <Row>
                        <ProductList colClass="col-12" layoutList="list-view" noSidebar={true} />
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


export default ListView;