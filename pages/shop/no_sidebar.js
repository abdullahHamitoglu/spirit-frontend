import React from 'react';
import CommonLayout from '../../components/shop/common-layout';
// import { withApollo } from '../../helpers/apollo/apollo';
import ProductList from './common/productList';
import { Container, Row } from 'reactstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';
import { useRouter } from 'next/router';

const NoSidebar = ({ products }) => {
    console.log(products);
    const router = useRouter();
    
    return (
        <CommonLayout title="collection" parent="home" >
            <section className="section-b-space ratio_asos">
                <div className="collection-wrapper">
                    <Container>
                        <Row>
                            <ProductList colClass="col-xl-3 col-6 col-grid-box" noSidebar={true} products={products} />
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
    const response = await axios.get(
        `${process.env.API_URL}api/v1/products?locale=${locale.slice(0, 2)}&currency=KWD&page=1&category=2`
    );
    const products = response.data.data

    return {
        props: {
            products,
            // pass the translation props to the page component
            ...(await serverSideTranslations(locale)),
        },
    }
}

export default NoSidebar;