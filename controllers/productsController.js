import currencyStore from "@/helpers/Currency/CurrencyStore";
import useUserStore from "@/helpers/user/userStore";
import axios from "axios";

const currency = currencyStore.getState().selectedCurrency.code;
export async function getProducts(locale) {
    try {
        const response = await axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/products`,
            params: {
                'locale': locale.slice(0, 2),
                'currency': currency,
            },
            headers: {
                'Authorization': `Bearer ${useUserStore.getState().token}`,
            },
        });

        return response.data.data;
    } catch (error) {
        throw error;
    }
};
export async function getCatagories(locale) {
    try {
        
        const response = await axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/categories`,
            params: {
                'locale': locale.slice(0, 2),
                'currency': currency,
                'parent_id': 1
            },
        });
        
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export async function getBrands(locale) {
    try {
        const response = await axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/brands`,
            params: {
                'locale': locale.slice(0, 2),
                'currency': currency,
            },
        });

        return response.data.data;
    } catch (error) {
        throw error;
    }
};