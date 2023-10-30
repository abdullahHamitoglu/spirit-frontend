import React, { useEffect, useState } from 'react';
import CommonLayout from '../../components/shop/common-layout';
import { Container, Row } from 'reactstrap';
import FilterPage from '@/components/shop/common/filter';
import ProductList from '@/components/shop/common/productList';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import currencyStore from '@/helpers/Currency/CurrencyStore';
import useUserStore from '@/helpers/user/userStore';

const index = ({ products, categories ,brands }) => {
    const [sidebarView, setSidebarView] = useState(false);
    const { t } = useTranslation();
    const [data, setData] = useState({
        products: products,
        loading: true,
    });
    const openCloseSidebar = () => {
        if (sidebarView) {
            setSidebarView(!sidebarView)
        } else {
            setSidebarView(!sidebarView)
        }
    }
    useEffect(() => {
        setData({ ...data, loading: false })
    }, [products])

    return (
        <CommonLayout title={t('products')} parent={t('home')} >
            <section className="section-b-space ratio_asos">
                <div className="collection-wrapper">
                    <Container>
                        <Row>
                            <FilterPage categories={categories} brands={brands} sm="3" sidebarView={sidebarView} closeSidebar={() => openCloseSidebar(sidebarView)} />
                            <ProductList colClass="col-xl-3 col-6 col-grid-box" layoutList='' openSidebar={() => openCloseSidebar(sidebarView)} data={data} />
                        </Row>
                    </Container>
                </div>
            </section>
        </CommonLayout>
    )
}
export async function getStaticProps(context) {
    // extract the locale identifier from the URL
    const currency = currencyStore.getState().selectedCurrency.code
    const { locale } = context
    const response = await axios({
        method: 'GET',
        url: `${process.env.API_URL}api/v1/products`,
        params: {
            'locale': locale.slice(0, 2),
            'currency': currency,
            'brand': '',
            'page': 1,
            'price': '',
        },
        headers: {
            'Authorization': `Bearer ${useUserStore.getState().token}`,
        },
    });
    const products = response.data.data
    const categoriesResponse = await axios({
        url: `${process.env.API_URL}api/v1/categories?locale=${locale.slice(0, 2)}&currency=${currency}&parent_id=1`,
    })
    const categories = categoriesResponse.data.data
    const brandsResponse = await axios({
        url: `${process.env.API_URL}api/v1/brands?locale=${locale.slice(0, 2)}&currency=${currency}&parent_id=1`,
    })
    const brands = brandsResponse.data.data

    return {
        props: {
            // pass the translation props to the page component
            products,
            categories,
            brands,
            ...(await serverSideTranslations(locale)),
        },
    }
}

export default index;