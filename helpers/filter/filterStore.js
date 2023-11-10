// userStore.js
import axios from 'axios';
import { create } from 'zustand';

import { persist, createJSONStorage } from 'zustand/middleware'
import currencyStore from '../Currency/CurrencyStore';
import useUserStore from '../user/userStore';
const currency = currencyStore.getState().selectedCurrency.code;


const useFilterStore = create(
    (set, get) => (
        {
            productsIsFetching:false,
            filteredProducts:'',
            currency: '',
            search: '',
            option: '',
            brand: '',
            price: 0,
            maxPrice: 1,
            page: 1,
            category: '',
            brand_id: '',
            setCurrency: (val) => set({ valency: val }),
            setSearch: (val) => set({ search: val }),
            setOption: (val) => set({ option: val }),
            setBrand: (val) => set({ brand: val }),
            setMaxPrice: (val) => set({ maxPrice: val }),
            setPrice: (val) => set({ price: val }),
            setPage: (val) => set({ page: val }),
            setCategory: (val) => set({ category: val }),
            setBrand_id: (val) => set({ brand_id: val }),
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
                    set({ maxPrice: response.data.data.max_price });
                }).catch((error)=> {
                    console.log(error);
                });
            },
            filterProducts: async (locale , params) => {
                set({productsIsFetching: true})
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
                }).then((response)=>{
                    set({productsIsFetching: false , filteredProducts : response.data.data});
                }).catch((error)=> {
                    console.log(error);
                });
            }
        }
    )
);

export default useFilterStore;