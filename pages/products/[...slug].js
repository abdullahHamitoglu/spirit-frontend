import ProductSection from '@/components/common/product-box/ProductBox11';
import CommonLayout from '@/components/shop/common-layout';
import NoSidebarPage from '@/components/shop/product/noSidebarPage';
import { getProductBySlug, getProductReviews, getProducts } from '@/controllers/productsController';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React from 'react';
import { useTranslation } from 'react-i18next';

function Post({ product, reviews }) {
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
  console.log(product.rich_snippets);
  return (
    <>
      <Head>
        {/* <meta name="keywords" content={product.meta_keywords} /> */}
        <meta name="description" content={product.description} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.name} />
        <meta property="og:url" content={URL} />
        <meta property="og:image" content={product.images.original_image_url} />
        <meta property="og:image:alt" content={product.name} />
        <meta property="og:description" content={product.description} />
        <title>{product.name}</title>
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
export async function getStaticPaths(context) {
  const { locales } = context

  const paths = locales.map((locale) => ({
    params: {
      slug: ['product-slug'],
    },
    locale,
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {

  const { locale } = context;

  const slug = context.params.slug;

  const product = await getProductBySlug(locale, slug);

  const reviews = await getProductReviews(locale, product.id);

  if (!product && !reviews) {
    return {
      notFound: true, // Return notFound: true if product not found
    };
  }

  return {
    props: {
      product,
      reviews,
      ...(await serverSideTranslations(locale)),
    },
  };

}


export default Post;
