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
        }
    )
);

export default useFilterStore;