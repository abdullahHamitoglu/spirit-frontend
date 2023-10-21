// userStore.js
import { create } from 'zustand';
import { getUserAgent } from './getUserAgent';
import { toast } from 'react-toastify';
import axios from 'axios';
import { persist, createJSONStorage } from 'zustand/middleware'


const osDetails = getUserAgent();

const useUserStore = create(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            token: null,
            expirationTime: null,
            address:[],

            register: async (userData, locale) => {
                // Send a POST request to your registration API endpoint
                await axios({
                    method: 'post',
                    url: process.env.API_URL + `api/v1/customer/register?locale=${locale.slice(0, 2)}`,
                    data: userData,
                }).then(res => {
                    if (res.data) {
                        toast.success(res.data.message)
                    }
                }).catch(function (error, errors) {
                    if (error.response) {
                        toast.error(error.response.data.message);
                    }
                    console.log(errors, error);
                });
            },
            login: async (userData, locale) => {
                await axios({
                    method: 'post',
                    url: process.env.API_URL + `api/v1/customer/login?locale=${locale.slice(0, 2)}`,
                    data: { ...userData, device_name: osDetails.name },
                }).then(res => {
                    if (res.data && res.status == 200) {
                        toast.success(res.data.message)
                        console.log(res.data.token);
                        set({
                            user: res.data.data,
                            isAuthenticated: true,
                            token: res.data.token,
                            expirationTime: new Date().getTime() + 24 * 60 * 60 * 1000,
                        });
                    }
                }).catch(function (error, errors) {
                    if (error.response) {
                        toast.error(error.response.data.message);
                    }
                    console.log(errors, error);
                });
            },
            checkTokenExpiry: () => {
                if (get().tokenExpiry && new Date().getTime() >= get().tokenExpiry) {
                    set({
                        user: null,
                        isAuthenticated: false,
                        token: null,
                        expirationTime: null,
                    });
                }
            },

            updateProfile: async (profileData) => {
                console.log(`Bearer ${get().token}`);
                await axios({
                    method: 'put',
                    url: process.env.API_URL + `api/v1/customer/profile`,
                    headers: {
                        'Authorization': `Bearer ${get().token}`
                    },
                    data: profileData,
                }).then(res => {
                    if (res.data) {
                        toast.success(res.data.message);
                        set({ user: res.data.data, isAuthenticated: true });
                    }
                }).catch(function (error, errors) {
                    if (error.message) {
                        toast.error(error.message);
                    }
                    console.log(errors, error);
                });
            },

            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                    token: null,
                    expirationTime: null,
                });
            },

            Address: async (formData, method, id) => {
                const url = process.env.API_URL + 'api/v1/customer/addresses' + (id ?? `/${id}`)

                await axios({
                    method: method ?? 'get',
                    url,
                    headers: {
                        'Authorization': `Bearer ${get().token}`
                    },
                    data: method == 'post' && method == 'put' ? formData : null,
                }).then(res => {
                    if (res.data && res.status == 200) {
                        toast.success(res.data.message);
                        set({
                            address: res.data.data
                        })
                    }
                }).catch(function (error, errors) {
                    if (error.message) {
                        toast.error(error.message);
                    }
                    console.log(errors, error);
                });
            },
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
);

export default useUserStore;
