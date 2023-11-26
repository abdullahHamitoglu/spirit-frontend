import ProductSection from '@/components/common/product-box/ProductBox11';
import CommonLayout from '@/components/shop/common-layout';
import NoSidebarPage from '@/components/shop/product/noSidebarPage';
import { getProductBySlug, getProducts } from '@/controllers/productsController';
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useTranslation } from 'react-i18next';

function Post({ product }) {
  const { t } = useTranslation();

  return (
    <CommonLayout parent={t('products')} parentLink="/products" title={product.name}>
      <NoSidebarPage pathId={product.id} product={product} />
      <ProductSection />
    </CommonLayout>
  );
}
export async function getStaticPaths(context) {
  const { locales } = context
  const response = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/products`,
  }).catch((error) => {
    console.log(error);
  });
  const products = response.data.data;

  const paths = products.flatMap((product) => {
    return locales.map((locale) => ({
      params: {
        slug: [product.url_key],
      },
      locale,
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
