import ProductSection from '@/components/common/product-box/ProductBox11';
import CommonLayout from '@/components/shop/common-layout';
import NoSidebarPage from '@/components/shop/product/noSidebarPage';
import { getProductBySlug, getProductReviews, getProducts } from '@/controllers/productsController';
import currencyStore from '@/helpers/Currency/CurrencyStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function Product({ productData, reviews }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [product, setProduct] = useState(productData);
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const URL = `${origin}${router.asPath}`;
  if (!product && !reviews) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }
  const { locale, query } = useRouter();
  const { selectedCurrency } = currencyStore();
  const updateCurrency = async () => {
    const productData = await getProductBySlug(locale, query.slug, selectedCurrency.code);
    setProduct(productData);
  }

  useEffect(() => {
    updateCurrency();
  }, []);
  console.log(product);
  return (
    <>
      <Head>
        <meta name="keywords" content={product.meta_keywords} />
        <meta name="description" content={product.meta_desorption} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.meta_title} />
        <meta property="og:url" content={URL} />
        <meta property="og:image" content={product.images.original_image_url} />
        <meta property="og:image:alt" content={product.meta_title} />
        <meta property="og:description" content={product.description} />
        <title>{product.meta_title}</title>
      </Head>
      <CommonLayout parent={t('products')} parentLink="/products" title={product.name}>
        <NoSidebarPage pathId={product.id} product={product} reviews={reviews} />
        <ProductSection />
      </CommonLayout>
      <Script type="application/ld+json">
        {product.rich_snippets}
      </Script>
    </>
  );
}


export async function getServerSideProps(context) {

  const { locale } = context;

  const slug = context.params.slug;

  const { token, currencyCode } = parseCookies(context);
  
  const productData = await getProductBySlug(locale, slug, currencyCode);

  const reviews = await getProductReviews(locale, productData.id);

  if (!productData && !reviews) {
    return {
      notFound: true, // Return notFound: true if product not found
    };
  }

  return {
    props: {
      productData,
      reviews,
      ...(await serverSideTranslations(locale)),
    },
  };

}


export default Product;
