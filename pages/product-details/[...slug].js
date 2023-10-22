import React from 'react';
import { useRouter } from 'next/router'
import CommonLayout from '../../components/shop/common-layout';
import ProductSection from './common/product_section';
// import { withApollo } from '../../helpers/apollo/apollo';
import LeftSidebarPage from './product/leftSidebarPage';

const LeftSidebar = () => {

  const router = useRouter();
  const id = router.query.slug;

  return (
    <CommonLayout parent="Home" title="Product">
      <LeftSidebarPage pathId={id}  />
      <ProductSection />
    </CommonLayout>
  );
}

export async function getStaticPaths() {
    const currency =  JSON.parse(sessionStorage.getItem('currency-storage')).state.selectedCurrency;
    const response = await axios.get(
        `${process.env.API_URL}api/v1/products?locale=${locale.slice(0, 2)}&currency=${currency}`
    );
    const products = response.data.data
    const paths = [];
    products.map((product) => { paths.push(`/${product.url_key}`) })
    return { paths, fallback: true };
}


export async function getStaticProps(context,{ params }) {
    // extract the locale identifier from the URL
    const { slug } = params;
    const { locale } = context;
    const currency =  JSON.parse(sessionStorage.getItem('currency-storage')).state.selectedCurrency;
    try {
        const response = await axios.get(
            //{{url}}api/v1/products-slug/product-5?locale={{locale}}&currency={{currency}}
            `${process.env.API_URL}api/v1/products-slug/${slug}/?locale=${locale.slice(0, 2)}&currency=${currency}`
        );
        const products = response.data.data
    
        return {
            props: {
                products,
                // pass the translation props to the page component
                ...(await serverSideTranslations(locale)),
            },
        }
        
    } catch (error) {
        console.error(error);
        return { notFound: true };
    }
}


export default LeftSidebar;