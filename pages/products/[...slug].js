import ProductSection from '@/components/common/product-box/ProductBox11';
import CommonLayout from '@/components/shop/common-layout';
import NoSidebarPage from '@/components/shop/product/noSidebarPage';
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

function Post({ product }) {
  const {t} = useTranslation();
  const { slug } = useParams();

  return (
    <CommonLayout parent={t('products')} parentLink="/products" title={product.name}>
      <NoSidebarPage pathId={product.id} product={product} />
      <ProductSection />
    </CommonLayout>
  );
}
export async function getStaticPaths({ locale, locales }) {
  
  const response = await axios(`${process.env.API_URL}api/v1/products?locale=${String(locale).slice(0, 2)}&currency=KWD`);
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
  
  const response = await axios.get(`${process.env.API_URL}api/v1/products-slug/${slug}?locale=${locale.slice(0, 2)}&currency=KWD`);

  const product = await response.data.data;

  return {
    props: {
      product,
      ...(await serverSideTranslations(locale)),
    },
  };

}


export default Post;
