import React, { useEffect, useState } from "react";
import ThemeSettings from "../components/customizer/theme-settings";
import "../public/assets/scss/app.scss";
import { ToastContainer } from "react-toastify";
import TapTop from "../components/common/widgets/Tap-Top";
import FilterProvider from "../helpers/filter/FilterProvider";
import SettingProvider from "../helpers/theme-setting/SettingProvider";
import { CompareContextProvider } from "../helpers/Compare/CompareContext";
import { appWithTranslation, useTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import useUserStore from "../helpers/user/userStore";
import { setCookie } from "nookies";
import { getServerSideProps } from "./account/dashboard";
import { getProducts } from "@/controllers/productsController";
import PageLoader from "@/components/layouts/Bags/common/PageLoader";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  const router = useRouter();
  const { locale } = useRouter();
  const { token, registerDevice } = useUserStore();
  const { t } = useTranslation();
  useEffect(() => {
    setIsLoading(true);
    document.documentElement.style.setProperty("--theme-deafult", "#00c2b5");
    if (locale == "ar-KW") {
      setIsLoading(false);
      document.documentElement.dir = "rtl";
      document.body.classList.add("rtl");
    } else {
      setIsLoading(false);
      document.body.classList.remove("ltr");
      document.documentElement.dir = "ltr";
      document.body.classList.remove("rtl");
    }
    setCookie(null, "token", token, {
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
  }, [router.locale])


  useEffect(() => {
    setIsLoading(false);
    registerDevice();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {isLoading && <PageLoader />}
          <Head>
            {locale == "ar-KW" ? (
              <>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                  rel="preconnect"
                  href="https://fonts.gstatic.com"
                  crossorigin
                />
                <link
                  href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
                  rel="stylesheet"
                />
              </>
            ) : (
              ""
            )}
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="token" content="" />
            <link
              rel="icon"
              type="image/x-icon"
              href="assets/images/favicon.png"
            />
            <title>{t('spirit')}</title>
          </Head>
          <SettingProvider>
            <CompareContextProvider>
              <FilterProvider>
                <Component {...pageProps} />
              </FilterProvider>
              <ThemeSettings />
            </CompareContextProvider>
          </SettingProvider>
          <ToastContainer />
          <TapTop />
        </>
      )}
    </>
  );
}

export default appWithTranslation(MyApp);
