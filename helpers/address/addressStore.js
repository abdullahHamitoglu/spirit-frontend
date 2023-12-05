import axios from 'axios';
import { create } from 'zustand';


const addressStore = create(
    (set, get) => ({
        cities: [],
        states: [],
        countries: [],
        loading: false,
        getCountries: async (locale) => {
            await axios({
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/countries`,
                params: {
                    locale: locale.slice(0, 2)
                },
            }).then((response) => {
                set({ countries: response.data.data })
            }).catch((error) => {
                console.error(error);
            })
        },
        fetchStates: async (locale, countryCode) => {
            set({ states: [], loading: true })
            await axios({
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/countries/states/groups`,
                params: {
                    locale: locale.slice(0, 2)
                },
            }).then((response) => {
                set({ states: response.data.data[countryCode], loading: false });
            }).catch((error) => {
                console.error(error);
            })
        },
        fetchCities: async (cities) => {
            set({ cities });
        },
    }),
);


export default addressStore;
