import ProductSection from '@/components/common/product-box/ProductBox11';
import CommonLayout from '@/components/shop/common-layout';
import NoSidebarPage from '@/components/shop/product/noSidebarPage';
import { getProductBySlug, getProductReviews, getProducts } from '@/controllers/productsController';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { parseCookies } from 'nookies';
import React from 'react';
import { useTranslation } from 'react-i18next';

function Product({ product, reviews }) {
  const { t } = useTranslation();
  const router = useRouter();
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
  try {

    const { locale } = context;

    const slug = context.params.slug;

    const { token, currencyCode } = parseCookies(context);

    const product = await getProductBySlug(locale, slug, currencyCode);

    const reviews = await getProductReviews(locale, product.id);

    if (!product && !reviews) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product,
        reviews,
        ...(await serverSideTranslations(locale)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }

}


export default Product;
