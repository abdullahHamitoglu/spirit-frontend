import React, { useEffect, useState } from "react";
import ThemeSettings from "../components/customizer/theme-settings";
import "../public/assets/scss/app.scss";
import { ToastContainer } from "react-toastify";
import TapTop from "../components/common/widgets/Tap-Top";
import CartContextProvider from "../helpers/cart/CartContext";
import { WishlistContextProvider } from "../helpers/wishlist/WishlistContext";
import FilterProvider from "../helpers/filter/FilterProvider";
import SettingProvider from "../helpers/theme-setting/SettingProvider";
import { CompareContextProvider } from "../helpers/Compare/CompareContext";
import { appWithTranslation } from 'next-i18next';
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../helpers/apollo";
import Head from "next/head";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  const apolloClient = useApollo(pageProps);
  const { locale } = useRouter();
  useEffect(() => {
    document.documentElement.style.setProperty("--theme-deafult", "#00c2b5");
    if (locale == 'ar-KW') {
      document.documentElement.dir = 'rtl';
      document.body.classList.add("rtl");
    } else {
      document.documentElement.dir = 'ltr';
      document.body.classList.remove("rtl");
    }
    return () => {
      document.documentElement.style.removeProperty("--theme-deafult");
    };
  });
  useEffect(() => {
    const path = window.location.pathname.split("/");
    const url = path[path.length - 1];
    document.body.classList.add("dark");

    let timer = setTimeout(function () {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      <ApolloProvider client={apolloClient}>
        {isLoading ? (
          <div className="loader-wrapper">{url === "Christmas" ? <div id="preloader"></div> : <div className="loader"></div>}</div>
        ) : (
          <>
            <Head>
              {locale == 'ar-KW' ?
                <>
                  <link rel="preconnect" href="https://fonts.googleapis.com" />
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet" />
                </>
                : ''}
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" type="image/x-icon" href='assets/images/favicon.png' />
              <title>Spirit - Multi-purpopse E-commerce React Template</title>
            </Head>
            <SettingProvider>
              <CompareContextProvider>
                <CartContextProvider>
                  <WishlistContextProvider>
                    <FilterProvider>
                      <Component {...pageProps} />
                    </FilterProvider>
                  </WishlistContextProvider>
                </CartContextProvider>
                <ThemeSettings />
              </CompareContextProvider>
            </SettingProvider>
            <ToastContainer />
            <TapTop />
          </>
        )}
      </ApolloProvider>
    </>
  );
}

export default appWithTranslation(MyApp)