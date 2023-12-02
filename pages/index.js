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


const Fashion = ({ page, homeData, video }) => {
  const { t } = useTranslation()
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={"/assets/images/favicon/1.png"} />
        <meta name="description" content={page.content} />
        <meta name="keywords" content={page.meta_keywords} />
        <meta name="description" content={page.meta_description} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={page.meta_title} />
        <meta property="og:url" content={page.url} />
        <meta property="og:image" content={page.image} />
        <meta property="og:image:alt" content={page.meta_title} />
        <meta property="og:description" content={page.meta_description} />
        <title>{page.meta_title}</title>
      </Head>
      <ModalComponent />
      <MainBanner sliders={homeData.sliders} />
      {
        homeData.collections_products &&
        <div className="section-b-space">
          {homeData.collections_products.map((collection, key) => (
            <>
              <TopCollection
                key={key}
                type="beauty"
                innerClass="title1"
                inner="title-inner1"
                designClass="p-t-0 ratio_asos mb-4"
                noSlider="true"
                cartClass="cart-info cart-wrap"
                collection={collection}
              />
              {key == 0 &&
                <VideoSection video={video} />
              }
            </>
          ))}
        </div>
      }
      {/* <section className="instagram ratio_square section-b-space">
        <Instagram type="beauty" />
      </section> */}
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

  let video = []
  try {
    const videoId = homeData.video; // Replace with the actual YouTube video ID
    const response = await axios.get(`https://www.youtube.com/watch?v=${videoId}`, {
      rejectUnauthorized: false,
      method: 'GET',
    });

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

      
    } else {
      video = []
    }
  } catch (error) {
    video = []
  }
  return {
    props: {
      page,
      video,
      homeData,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Fashion;
