import ProductSection from '@/components/common/product-box/ProductBox11';
import CommonLayout from '@/components/shop/common-layout';
import NoSidebarPage from '@/components/shop/product/noSidebarPage';
import { getProductBySlug, getProductReviews, getProducts } from '@/controllers/productsController';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useTranslation } from 'react-i18next';

function Post({ product ,reviews }) {
  const { t } = useTranslation();
  if (!product && !reviews) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <CommonLayout parent={t('products')} parentLink="/products" title={product.name}>
      <NoSidebarPage pathId={product.id} product={product} reviews={reviews} />
      <ProductSection />
    </CommonLayout>
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
