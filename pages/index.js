import React, { Fragment, useContext, useEffect } from "react";
import TopCollection from "../components/common/Collections/Collection3";
import Blog from "../components/common/Blog/blog1";
import Instagram from "../components/common/instagram/instagram1";
import { Product5 } from "../services/script";
import ModalComponent from "../components/common/Modal";
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MasterFooter from "../components/footers/common/MasterFooter";
import VideoSection from "../components/layouts/Beauty/components/Video-Section";
import ThemeSettings from "../components/customizer/theme-settings";
import MainBanner from "../components/layouts/Beauty/components/MainBanner";
import AboutSection from "../components/layouts/Beauty/components/About-Section";
import { useTranslation } from "react-i18next";
import { getHomePageData, getPageData } from "../controllers/homeController";


const Fashion = ({ page, homeData }) => {
  const { t } = useTranslation()
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={"/assets/images/favicon/1.png"} />
        <meta name="description" content={page.content} />
        <title>{page.title}</title>
      </Head>
      <ModalComponent />
      <MainBanner sliders={homeData.sliders} />
      <div className="section-b-space">
        <AboutSection />
      </div>
      <div className="section-b-space">
        <TopCollection
          type="beauty"
          innerClass="title1"
          inner="title-inner1"
          productSlider={Product5}
          title={t('topCollections.title')} // Add a text key for the title
          subtitle={t('topCollections.subtitle')} // Add a text key for the subtitle
          designClass="p-t-0 ratio_asos"
          noSlider="true"
          cartClass="cart-info cart-wrap"
          collection={homeData.collections_products[1]}
        />
      </div>
      <div className="section-b-space">
        <VideoSection />
      </div>
      <TopCollection
        innerClass="title1"
        inner="title-inner1"
        type="beauty"
        productSlider={Product5}
        title={t('topCollections.title')} // Add a text key for the title
        subtitle={t('topCollections.subtitle')} // Add a text key for the subtitle
        designClass="p-t-0 ratio_asos"
        noSlider="true"
        cartClass="cart-info cart-wrap"
        collection={homeData.collections_products[0]}
      />
      <Blog type="beauty" title="title1" inner="title-inner1" />
      <section className="instagram ratio_square section-b-space">
        <Instagram type="beauty" />
      </section>
      <MasterFooter
        footerClass={`footer-light`}
        footerLayOut={"light-layout upper-footer"}
        footerSection={"small-section border-section border-top-0"}
        belowSection={"section-b-space light-layout"}
        newLatter={true}
        logoName={"layout3/logo.png"}
      />
      <ThemeSettings />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  // extract the locale identifier from the URL
  const { locale } = context;

  const homeData = await getHomePageData(locale);

  const page = await getPageData(locale, 'home');
  
  return {
    props: {
      // pass the translation props to the page component
      page,
      homeData,
      ...(await serverSideTranslations(locale)),
    },
  }
}

export default Fashion;
