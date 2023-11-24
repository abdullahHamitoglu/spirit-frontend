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
import { parseCookies } from "nookies";
import cheerio from 'cheerio';
import axios from "axios";


const Fashion = ({ page, homeData ,videoInfo }) => {
  console.log(videoInfo);
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
        <VideoSection video={videoInfo} />
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

export async function getServerSideProps(context) {
  // extract the locale identifier from the URL
  const { locale } = context;
  const { token } = parseCookies(context);

  const homeData = await getHomePageData(locale);

  const page = await getPageData(locale, 'home', token);


  try {
    const videoId = 'UAVC8XfYLWw'; // Replace with the actual YouTube video ID
    const response = await axios.get(`https://www.youtube.com/watch?v=${videoId}`);

    const $ = cheerio.load(response.data);

    const title = $('meta[name="title"]').attr('content');
    const description = $('meta[name="description"]').attr('content');
    const image = $('link[rel="image_src"]').attr('href');
    const url = $('meta[property="og:video:url"]').attr('content');

    if (title && description && image) {
      const videoInfo = {
        title,
        description,
        image,
        url
      };

      return {
        props: {
          // pass the translation props to the page component
          videoInfo,
          page,
          homeData,
          ...(await serverSideTranslations(locale)),
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Fashion;
