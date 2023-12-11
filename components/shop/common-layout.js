import React, { useEffect, useState } from "react";
import HeaderOne from "../headers/header-one";
import Breadcrubs from "../common/widgets/breadcrubs";
import MasterFooter from "../footers/common/MasterFooter";
import Head from "next/head";
import { getCategoriesTree } from "@/controllers/productsController";
import { useRouter } from "next/router";

const CommonLayout = ({ children, title, parent, subTitle, parentLink }) => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const fetchCates = async () => {
    const response = await getCategoriesTree(router.locale);
    setCategories(response);
  };

  useEffect(() => {
    fetchCates();
  }, [])
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/assets/images/favicon/1.png" />
      </Head>
      <HeaderOne categories={categories} topClass="top-header" logoName="logo.png" />
      <Breadcrubs title={title} parent={parent} subTitle={subTitle} parentLink={parentLink} />
      <>{children}</>
      <MasterFooter
        categories={categories}
        footerClass={`footer-light `}
        footerLayOut={"light-layout upper-footer"}
        footerSection={"small-section border-section border-top-0"}
        belowSection={"section-b-space light-layout"}
        newLatter={true}
      />
    </>
  );
};

export default CommonLayout;
