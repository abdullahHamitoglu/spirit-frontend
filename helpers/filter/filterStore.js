// userStore.js
import axios from 'axios';
import { create } from 'zustand';

import { persist, createJSONStorage } from 'zustand/middleware'
import currencyStore from '../Currency/CurrencyStore';
import useUserStore from '../user/userStore';
import { getProducts } from '@/controllers/productsController';
const currency = currencyStore.getState().selectedCurrency.code;


const useFilterStore = create(
    (set, get) => (
        {
            productsIsFetching: false,
            filteredProducts: '',
            moreProducts: '',
            price: 0,
            maxPrice: 1000,
            page: 1,
            getMaxPrice: async (locale, params) => {
                await axios({
                    method: 'get',
                    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/maximum-price`,
                    params: {
                        locale: locale.slice(0, 2),
                        currency: currency,
                        ...params
                    }
                }).then((response) => {
                    // set({ maxPrice: response.data.data.max_price });
                }).catch((error) => {
                    console.error(error);
                });
            },
            filterProducts: async (locale, params) => {
                set({ productsIsFetching: true })
                await axios({
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
                }).then((response) => {
                    set({ productsIsFetching: false, filteredProducts: response.data.data });
                }).catch((error) => {
                    console.error(error);
                });
            },
            getMoreProducts: async (pageUrl, params) => {
                try {
                    await axios({
                        url: nextUrl,
                    }).then((res) => {
                        set({ moreProducts: res.data.data ,nextUrl: res.data.data });
                    });
                } catch (error) {
                    set({ filteredProducts: [] });
                }
            }
        }
    )
);

export default useFilterStore;