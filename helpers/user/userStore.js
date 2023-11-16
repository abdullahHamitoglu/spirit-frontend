// userStore.js
import { create } from 'zustand';
import { getUserAgent } from './getUserAgent';
import { toast } from 'react-toastify';
import axios from 'axios';
import { persist, createJSONStorage } from 'zustand/middleware'
import uuid from 'react-uuid';

const osDetails = getUserAgent();

const useUserStore = create(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            token: null,
            expirationTime: null,
            addresses: [],
            fcmToken: 0,
            register: async (userData, locale) => {
                // Send a POST request to your registration API endpoint
                await axios({
                    method: 'post',
                    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/register?locale=${locale.slice(0, 2)}`,
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
                    url: process.env.NEXT_PUBLIC_API_URL + `api/v1/customer/login?locale=${locale.slice(0, 2)}`,
                    data: { ...userData, device_name: osDetails.name },
                }).then(res => {
                    if (res.data && res.status == 200) {
                        toast.success(res.data.message)
                        set({
                            user: res.data.data,
                            isAuthenticated: true,
                            token: res.data.token,
                            expirationTime: new Date().getTime() + 24 * 60 * 60 * 1000,
                        });
                        document.querySelector('meta[name=token]').setAttribute("content", res.data.token);
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

            updateProfile: async (data) => {
                await axios({
                    method: 'put',
                    url: process.env.NEXT_PUBLIC_API_URL + `api/v1/customer/profile`,
                    headers: {
                        'Authorization': `Bearer ${get().token}`
                    },
                    data,
                }).then(res => {
                    if (res.data) {
                        toast.success(res.data.message);
                        set({ user: res.data.data, isAuthenticated: true });
                    }
                }).catch(function (error, errors) {
                    if (error.message) {
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
            forgetPwd: async (data, locale) => {
                await axios({
                    method: 'post',
                    url: process.env.NEXT_PUBLIC_API_URL + `api/v1/customer/forgot-password?locale=${locale.slice(0, 2)}`,
                    data,
                }).then(res => {
                    if (res.data && res.status == 200) {
                        toast.success(res.data.message)
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
            addAddress: async (data, locale) => {
                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/addresses`,
                    params: {
                        locale: locale.slice(0, 2)
                    },
                    headers: {
                        'Authorization': `Bearer ${get().token}`
                    },
                    data
                }).then(res => {
                    if (res.data && res.status == 200) {
                        toast.success(res.data.message);
                    }
                }).catch((error) => {
                    if (error.response.data) {
                        toast.error(error.response.data.message);
                    }
                    console.log(error);
                });
            },
            getAddresses: async (locale) => {
                await axios({
                    method: 'get',
                    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/addresses`,
                    params: {
                        locale: locale.slice(0, 2)
                    },
                    headers: {
                        'Authorization': `Bearer ${get().token}`
                    },
                }).then(res => {
                    set({
                        addresses: res.data.data
                    })
                }).catch((error) => {
                    if (error.response.data) {
                        toast.error(error.response.data.message);
                    }
                    console.log(error);
                });
            },
            updateAddress: async (data, locale, id) => {
                await axios({
                    method: 'put',
                    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/addresses/${id}`,
                    params: {
                        locale: locale.slice(0, 2)
                    },
                    headers: {
                        'Authorization': `Bearer ${get().token}`
                    },
                    data
                }).then(res => {
                    toast(res.data.message);
                }).catch((error) => {
                    if (error.response.data) {
                        toast.error(error.response.data.message);
                    }
                    console.log(error);
                });
            },
            deleteAddress: async (locale, id) => {
                await axios({
                    method: 'DELETE',
                    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/addresses/${id}`,
                    params: {
                        locale: locale.slice(0, 2)
                    },
                    headers: {
                        'Authorization': `Bearer ${get().token}`
                    },
                }).then(res => {
                    toast(res.data.message);
                }).catch((error) => {
                    if (error.response.data) {
                        toast.error(error.response.data.message);
                    }
                    console.log(error);
                });
            },

            registerDevice: async () => {
                // if(fcmToken == undefined){
                await axios({
                    method: 'post',
                    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/register_device`,
                    data: {
                        "fcmToken": 0,
                        "os": "web"
                    },
                }).then(res => {
                    set({ fcmToken: res.data.data.deviceDetails.fcmToken });
                }).catch(function (error) {
                    if (error.response) {
                        toast.error(error.response.data.message);
                    }
                    console.log(error);
                });
                // }
            }
        }),
        {
            name: 'userStorage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
);

export default useUserStore;
