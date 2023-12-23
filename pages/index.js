import React, { Fragment, useContext, useEffect, useState } from "react";
import TopCollection from "../components/common/Collections/Collection3";
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MasterFooter from "../components/footers/common/MasterFooter";
import VideoSection from "../components/layouts/Beauty/components/Video-Section";
import MainBanner from "../components/layouts/Beauty/components/MainBanner";
import { useTranslation } from "react-i18next";
import { getHomePageData, getPageData } from "../controllers/homeController";
import { parseCookies } from "nookies";
import cheerio from 'cheerio';
import axios from "axios";
import PageLoader from "@/components/layouts/Bags/common/PageLoader";
import BrandSlider from "@/components/layouts/Beauty/components/brandSlider";
import CategoriesSlider from "@/components/layouts/Beauty/components/categoriesSlider";
import Link from "next/link";
import Service from "@/components/common/Service/service4";


const Fashion = ({ page, home, video }) => {
  const [homeData, setHomeData] = useState(home)
  const { t } = useTranslation();
  if (!homeData) {
    return <PageLoader />
  }
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
        <title>{page.meta_title ? page.meta_title : t('spirit')}</title>
      </Head>
      {/* <ModalComponent /> */}
      <MainBanner sliders={homeData.sliders} />
      <Service />
      {homeData && homeData.collections &&
        <div className="section-b-space mt-5">
          {homeData.collections.map((collection, key) => {
            if (key == 3) {
              return (
                <VideoSection video={video} />
              )
            }
            if (collection.type == 'brands') {
              return (
                <div className="section-b-space">
                  <BrandSlider brands={collection} />
                </div>
              )
            }
            if (collection.type.includes('products')) {
              return (
                <TopCollection
                  key={key}
                  type="beauty"
                  innerClass="title1"
                  inner="title-inner1"
                  designClass="p-t-0 ratio_asos mb-4"
                  noSlider="true"
                  cartClass="cart-info cart-wrap"
                  collection={collection}
                />)
            }
            if (collection.type == 'categories') {
              return (
                <div className="section-b-space">
                  <CategoriesSlider categories={collection} />
                </div>
              )
            }
            if (collection.type == 'message') {
              return (
                <Link href={collection.path} className="my-5 d-block">
                  <div className='title2'>
                    <h2 className='title-inner2'>{collection.title}</h2>
                  </div>
                  {collection.image &&
                    <Media className="mw-100" src={collection.image} alt={collection.title} />
                  }
                </Link>
              )
            }
          })}
        </div>
      }
      <MasterFooter
        footerClass={`footer-light`}
        footerLayOut={"light-layout upper-footer"}
        footerSection={"small-section border-section border-top-0"}
        belowSection={"section-b-space light-layout"}
        newLatter={true}
        logoName={"layout3/logo.png"}
      />
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  // extract the locale identifier from the URL
  const { locale } = context;
  const { token, currencyCode } = parseCookies(context);

  const home = await getHomePageData(locale, token, currencyCode);

  const page = await getPageData(locale, 'home', token, currencyCode);

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
      home,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Fashion;
