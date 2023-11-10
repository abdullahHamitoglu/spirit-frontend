import axios from "axios";
import currencyStore from "@/helpers/Currency/CurrencyStore";


const currency = currencyStore.getState().selectedCurrency.code;
export async function getPageData(locale, page) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/pages-slug/${page}?locale=${locale.slice(0, 2)}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export async function getHomePageData(locale) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/home-page?locale=${locale.slice(0, 2)}&currency=${currency}`)
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
