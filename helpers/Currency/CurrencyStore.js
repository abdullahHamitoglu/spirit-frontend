import axios from 'axios';
import { useEffect } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


const currencyStore = create(
    persist(
        (set, get) => ({
            selectedCurrency: {
                "id": 1,
                "code": "KWD",
                "name": "Kuwaiti Dinar",
                "symbol": "KWD",
            },
            currencies: [],
            fetchCurrencies: async (locale) => {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/currencies?locale=${locale.slice(0, 2)}`);
                    set({ currencies: response.data });
                } catch (error) {
                    console.error('Failed to fetch currencies:', error);
                }
            },

            setCurrency: (currency) => {
                set({ selectedCurrency: currency });
            },
        }),
        {
            name: 'currency-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);


export default currencyStore;