import React, { useEffect, useState } from "react";
import ThemeSettings from "../components/customizer/theme-settings";
import "../public/assets/scss/app.scss";
import { ToastContainer } from "react-toastify";
import TapTop from "../components/common/widgets/Tap-Top";
import FilterProvider from "../helpers/filter/FilterProvider";
import SettingProvider from "../helpers/theme-setting/SettingProvider";
import { CompareContextProvider } from "../helpers/Compare/CompareContext";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import useUserStore from "../helpers/user/userStore";
import nookies, { parseCookies, setCookie } from "nookies";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  const { locale } = useRouter();
  const { token, registerDevice, fcmToken } = useUserStore();
  useEffect(() => {
    document.documentElement.style.setProperty("--theme-deafult", "#00c2b5");
    if (locale == "ar-KW") {
      document.documentElement.dir = "rtl";
      document.body.classList.add("rtl");
    } else {
      document.documentElement.dir = "ltr";
      document.body.classList.remove("rtl");
      setIsLoading(false);
      setCookie(null, "token", token, {
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });
    }
    registerDevice();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="loader-wrapper">
          {url === "Christmas" ? (
            <div id="preloader"></div>
          ) : (
            <div className="loader"></div>
          )}
        </div>
      ) : (
        <>
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
            <title>Spirit</title>
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
