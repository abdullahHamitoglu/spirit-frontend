import currencyStore from "@/helpers/Currency/CurrencyStore";
import useUserStore from "@/helpers/user/userStore";
import axios from "axios";

const currency = currencyStore.getState().selectedCurrency.code;
export async function getProducts(locale , params) {
    try {
        const response = await axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/products`,
            params: {
                'locale': locale.slice(0, 2),
                'currency': currency,
                ...params
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
export async function getProductBySlug(locale, slug) {
    try {
        const response = await axios.get({
            url:`${process.env.NEXT_PUBLIC_API_URL}api/v1/products-slug/${slug}`,
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

export async function getFilterAttr(locale, params) {
    try {
        const response = await axios({ 
            method : 'GET',
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/filterable-attributes`,
            params: {
                locale: locale.slice(0, 2),
                currency:currency,
                ...params
            }
        })
        return response.data.data;
    } catch (error) {
        throw error;
    }

}
export async function getMaxPrice(locale, params) {
    try {
        const response = await axios({ 
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/maximum-price`,
            params: {
                locale: locale.slice(0, 2),
                currency:currency,
                ...params
            }
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }

}
