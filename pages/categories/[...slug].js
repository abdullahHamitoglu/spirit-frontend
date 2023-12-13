import React, { useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row } from "reactstrap";
import FilterPage from "@/components/shop/common/filter";
import ProductList from "@/components/shop/common/productList";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import { getCatagories, getCategoryBySlug, getFilterAttr, getProductsByCategorySlug } from "@/controllers/productsController";
import { getPageData } from "@/controllers/homeController";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import MasterCategory from "@/components/common/Collections/categoryCard";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import useUserStore from "@/helpers/user/userStore";
const Products = ({ products, page, attributes, categories }) => {
    if (!products) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        );
    }

    const [sidebarView, setSidebarView] = useState(false);

    const router = useRouter();

    const { locale } = useRouter();

    const [productsData, setProductsData] = useState(products.data);

    const { t } = useTranslation();
    const { token } = useUserStore();

    const openCloseSidebar = () => {
        if (sidebarView) {
            setSidebarView(!sidebarView);
        } else {
            setSidebarView(!sidebarView);
        }
    };
    const handelCategory = async (id) => {
        const response = await getProducts(locale, { ...router.query, category_id: id }, token);
        if (response.length > 0) {
            setProductsData((prevData) => [...prevData, ...response]);
        }
    }
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    const URL = `${origin}${router.asPath}`;
    return (
        <>
            <Head>
                <meta name="keywords" content={products.meta_keywords} />
                <meta name="description" content={products.meta_description} />
                <meta property="og:type" content="product" />
                <meta property="og:title" content={products.meta_title} />
                <meta property="og:url" content={URL} />
                <meta property="og:image" content={products.meta_image} />
                <meta property="og:image:alt" content={products.meta_title} />
                <meta property="og:description" content={products.meta_description} />
                <title>{products.meta_title}</title>
            </Head>
            <CommonLayout title={page.title} parent={t("home")}>
                <section className="section-b-space ratio_asos">
                    <div className="collection-wrapper">
                        {categories &&
                            <Container>
                                <Swiper
                                    className="mb-5"
                                    spaceBetween={50}
                                    slidesPerView="auto"
                                    breakpoints={{
                                        // when window width is >= 640px
                                        0: {
                                            slidesPerView: 4,
                                        },
                                        640: {
                                            slidesPerView: 4,
                                        },
                                        // when window width is >= 768px
                                        768: {
                                            slidesPerView: 8,
                                        },
                                    }}
                                    loop={true}
                                >
                                    {categories.map((category) => (
                                        <SwiperSlide onClick={() => handelCategory(category.id)}>
                                            <MasterCategory title={category.name} img={category.image_url} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Container>
                        }
                        <Container>
                            <Row>
                                <FilterPage
                                    attributes={attributes}
                                    getProducts={getProductsByCategorySlug}
                                    setProductsData={setProductsData}
                                    productsData={productsData}
                                    sm="3"
                                    sidebarView={sidebarView}
                                    closeSidebar={() => openCloseSidebar(sidebarView)}
                                />
                                <ProductList
                                    page={page}
                                    getProducts={getProductsByCategorySlug}
                                    colClass="col-xl-3 col-6 col-grid-box"
                                    layoutList=""
                                    openSidebar={() => openCloseSidebar(sidebarView)}
                                    products={products}
                                    productsData={productsData}
                                    setProductsData={setProductsData}
                                    attributes={attributes}
                                />
                            </Row>
                        </Container>
                    </div>
                </section>
            </CommonLayout>
        </>
    );
};

export async function getStaticPaths(context) {
    const { locales } = context

    const paths = locales.map((locale) => ({
        params: {
            slug: ['slug'],
        },
        locale,
    }));

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps(context) {

    const { locale, query } = context;
    const { token } = parseCookies(context);
    const slug = context.params.slug[0];
    const attributes = await getFilterAttr(locale);
    const page = await getPageData(locale, "products");
    const products = await getProductsByCategorySlug(locale, query, token, slug);
    const categories = await getCategoryBySlug(locale, slug, token, query);
    return {
        props: {
            page,
            products,
            attributes,
            categories,
            ...(await serverSideTranslations(locale)),
        },
    };
}

export default Products;