import axios from 'axios';
import { useEffect } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


const currencyStore = create(
    persist(
        (set, get) => ({
            selectedCurrency: {
                id: 1,
                code: "KWD",
                name: "Kuwaiti Dinar",
                symbol: "KWD",
            },
            currencies: [],
            fetchCurrencies: async (locale) => {
                await axios({
                    method: 'GET',
                    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/countries`,
                    params: {
                        locale: locale.slice(0, 2)
                    }
                }).then((response) => {
                    set({ currencies: response.data });
                }).catch((error) => {
                    console.error(error);
                })
            },
            setCurrency: async (locale, id) => {
                await axios({
                    method: 'GET',
                    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/currencies/${id}`,
                    params: {
                        locale: locale.slice(0, 2)
                    }
                }).then((response) => {
                    set({ selectedCurrency: response.data.data });
                }).catch((error) => {
                    console.error(error);
                })
            },
        }),
        {
            name: 'currency-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);


export default currencyStore;
