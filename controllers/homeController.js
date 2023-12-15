import axios from "axios";
import currencyStore from "@/helpers/Currency/CurrencyStore";
import { parseCookies } from "nookies";


const { token, currencyCode } = parseCookies();


const currency = currencyCode;

export async function getPagesData(locale) {
    try {
        const response = await axios({
            method: 'get',
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/pages`,
            params: {
                locale: locale.slice(0, 2)
            },
        })

        return response.data.data;
    } catch (error) {
        return []
    }

}
export async function getPageData(locale, page, token, currencyCode) {
    try {
        const response = await axios({
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/pages-slug/${page}`,
            params: {
                locale: locale.slice(0, 2),
                currency: currencyCode
            },
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return response.data.data;
    } catch (error) {
        return []
    }

}

export async function getHomePageData(locale, token, currencyCode) {
    try {
        const response = await axios({
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/home-page`,
            params: {
                locale: locale.slice(0, 2),
                currency: currencyCode
            },
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
export async function coreConfigFrontFields(locale) {
    try {
        const response = await axios({
            method: "get",
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/core-config-front-fields`,
            params: {
                locale: locale.slice(0, 2)
            },
        })
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

