// userStore.js
import create from 'zustand';
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
                            token: res.data.token0,
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

            address: async (formData ,method) => {
                await axios({
                    method: method,
                    url: process.env.API_URL + 'api/v1/customer/addresses',
                    headers: {
                        'Authorization': `Bearer ${get().token}`
                    },
                    data: method == 'post' && method == 'put' ? formData : null,
                }).then(res => {
                    if (res.data && res.status == 200) {
                        toast.success(res.data.message);
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
