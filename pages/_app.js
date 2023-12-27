import React, { useEffect, useState } from "react";
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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Tajawal } from 'next/font/google';
import Script from "next/script";

const tajawal = Tajawal({
    subsets: ['arabic'],
    style: ['normal'],
    display: 'swap',
    weight: ['200', '300', '400', '500', '700', '800', '900'],
})
function MyApp({ Component, pageProps }) {
    const [isLoading, setIsLoading] = useState(true);
    const [url, setUrl] = useState();
    const router = useRouter();
    const { locale } = useRouter();
    const { token, registerDevice } = useUserStore();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    useEffect(() => {

        const handleStart = (url) => {
            if (url !== router.asPath && !url.includes("?")) {
                setLoading(true);
            }
        };

        const handleComplete = (url) => {
            if (url === router.asPath && !url.includes("?")) {
                setLoading(false);
            }
        };

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
            setTimeout(() => {
                setLoading(false)
            }, 10000);
        }
    }, [router.asPath])

    useEffect(() => {
        setIsLoading(true);
        document.documentElement.style.setProperty("--theme-deafult", "#00c2b5");
        if (locale == "ar") {
            setIsLoading(false);
            document.documentElement.dir = "rtl";
            document.body.classList.add("rtl");
        } else {
            setIsLoading(false);
            document.body.classList.remove("ltr");
            document.documentElement.dir = "ltr";
            document.body.classList.remove("rtl");
        }
    }, [locale])


    useEffect(() => {
        setIsLoading(false);
        registerDevice();
        document.body.classList.remove("overflow-hidden");
    }, []);
    return (
        <>
            {isLoading ? (
                <div className="loader-wrapper">
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                    {loading && <PageLoader />}
                    <Head>
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
                        <Script src="https://www.googletagmanager.com/gtag/js?id=GTM-KDKQLGCS" />
                    </Head>
                    <CompareContextProvider>
                        <FilterProvider>
                            {locale == "ar" ? (
                                <style jsx global>{`
                                    html {
                                    font-family: ${tajawal.style.fontFamily} , sans-serif;
                                    }
                                    html *{
                                    font-family: ${tajawal.style.fontFamily} , sans-serif;
                                    }
                                `}</style>
                            ) : (
                                ""
                            )}
                            <Component {...pageProps} />
                            <Script src="https://www.googletagmanager.com/gtag/js?id=GTM-KDKQLGCS" />
                        </FilterProvider>
                    </CompareContextProvider>
                    <ToastContainer />
                    <TapTop />
                </>
            )}
        </>
    );
}
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
export default appWithTranslation(MyApp);
