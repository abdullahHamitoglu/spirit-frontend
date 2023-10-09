import React, { Fragment, useEffect } from "react";
import Banner from "../components/layouts/Fashion/Components/Banner";
import CollectionBanner from "../components/layouts/Fashion/Components/Collection-Banner";
import TopCollection from "../components/common/Collections/Collection3";
import Parallax from "../components/layouts/Fashion/Components/Parallax";
import SpecialProducts from "../components/common/Collections/TabCollection1";
import ServiceLayout from "../components/common/Service/service1";
import Blog from "../components/common/Blog/blog1";
import Instagram from "../components/common/instagram/instagram1";
import LogoBlock from "../components/common/logo-block";
import HeaderOne from "../components/headers/header-one";
import { Product4, Product5 } from "../services/script";
import Paragraph from "../components/common/Paragraph";
import ModalComponent from "../components/common/Modal";
import Head from 'next/head'
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import MasterFooter from "../components/footers/common/MasterFooter";
import MainBanner from "./layouts/Beauty/components/MainBanner";
import AboutSection from "./layouts/Beauty/components/About-Section";
import VideoSection from "@/components/layouts/Beauty/components/Video-Section";
import ThemeSettings from "@/components/customizer/theme-settings";

const Fashion = () => {
  useEffect(() => {
    document.documentElement.style.setProperty("--theme-deafult", "#f0b54d");

    return () => {
      document.documentElement.style.removeProperty("--theme-deafult");
    };
  });
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={"/assets/images/favicon/3.png"} />
      </Head>
      <ModalComponent />
      <MainBanner />
      <div className="section-b-space">
        <AboutSection />
      </div>
      <div className="section-b-space">
        <TopCollection
          type="beauty"
          innerClass="title1"
          inner="title-inner1"
          productSlider={Product5}
          title="New Products"
          subtitle="special offer"
          designClass="p-t-0 ratio_asos"
          noSlider="true"
          cartClass="cart-info cart-wrap"
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
        title="Top Collections"
        subtitle="special offer"
        designClass="p-t-0 ratio_asos"
        noSlider="true"
        cartClass="cart-info cart-wrap"
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
  const { locale } = context

  return {
    props: {
      // pass the translation props to the page component
      ...(await serverSideTranslations(locale)),
    },
  }
}

export default Fashion;
