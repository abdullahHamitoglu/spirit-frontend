import ProductSection from '@/components/common/product-box/ProductBox11';
import CommonLayout from '@/components/shop/common-layout';
import NoSidebarPage from '@/components/shop/product/noSidebarPage';
import { getProductBySlug, getProducts } from '@/controllers/productsController';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useTranslation } from 'react-i18next';

function Post({ product }) {
  const {t} = useTranslation();

  return (
    <CommonLayout parent={t('products')} parentLink="/products" title={product.name}>
      <NoSidebarPage pathId={product.id} product={product} />
      <ProductSection />
    </CommonLayout>
  );
}
export async function getStaticPaths({ locale, locales }) {
  

  const products = await getProducts(locale);

  const paths = products.flatMap((product) => {
    return locales.map((loc) => ({
      params: {
        slug: [product.url_key],
      },
      loc,
    }));
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {

  const { locale } = context;

  const slug = context.params.slug;

  const product = await getProductBySlug(locale, slug);

  return {
    props: {
      product,
      ...(await serverSideTranslations(locale)),
    },
  };

}


export default Post;
