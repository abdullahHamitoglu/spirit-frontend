import axios from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import useUserStore from '../user/userStore';
import currencyStore from '../Currency/CurrencyStore';

const useCartStore = create(
    (set, get) => ({
        cartData: [],
        cartLoading: false,
        count: 0,
        savedAddress: [],
        rates: [],
        paymentMethods: [],
        orderDetails: [],
        redirect_url: '',
        iframeHtml: '',
        increment: () => {
            set((state) => ({ count: state.count > -1 ? state.count + 1 : state.count }))
        },
        decrement: () => set((state) => ({ count: state.count - 1 })),
        getCart: (locale, currency) => {
            set({ cartLoading: true });
            axios({
                method: "GET",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart`,
                params: {
                    locale,
                    currency
                },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${useUserStore.getState().token}`
                },
            }).then((res) => {
                set({ cartData: res.data.data, cartLoading: false });
            }).catch((error) => {
                set({ cartLoading: false });
                console.error(error);
            });
        },
        addToCart: (locale, data) => {
            set({ cartLoading: true });
            axios({
                method: "post",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart/add`,
                params: {
                    locale: locale,
                    currency: currencyStore.getState().selectedCurrency.code
                },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${useUserStore.getState().token}`
                },
                data: {
                    ...data,
                    register_device_id: useUserStore.getState().registeredDeviceID
                },
            }).then((res) => {
                set({ cartData: res.data.data, cartLoading: false });
                toast.success(res.data.message);
                get().getCart(locale, currencyStore.getState().selectedCurrency.code);
            }).catch((error) => {
                set({ cartLoading: false })
                console.error(error);
            });
        },
        removeFromCart: (locale, id) => {
            set({ cartLoading: true });
            axios({
                method: "DELETE",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart/remove/${id}`,
                params: {
                    locale: locale,
                    currency: currencyStore.getState().selectedCurrency.code
                },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${useUserStore.getState().token}`
                },
            }).then((res) => {
                toast.success(res.data.message);
                get().getCart(locale, currencyStore.getState().selectedCurrency.code);
            }).catch((error) => {
                set({ cartLoading: false })
                console.error(error);
            });
        },
        emptyFromCart: (locale) => {
            set({ cartLoading: true });
            axios({
                method: "DELETE",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart/empty`,
                params: {
                    locale: locale,
                    currency: currencyStore.getState().selectedCurrency.code
                },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${useUserStore.getState().token}`
                },
            }).then((res) => {
                toast.success(res.data.message)
                set({ cartData: res.data.data, cartLoading: false });
                toast.success(res.data.message);
            }).catch((error) => {
                set({ cartLoading: false })
                console.error(error);
            });
        },
        updateQty: (id, qyt, locale) => {
            axios({
                method: "put",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart/update`,
                withCredentials: true,
                params: {
                    locale: locale,
                    currency: currencyStore.getState().selectedCurrency.code
                },
                headers: {
                    'Authorization': `Bearer ${useUserStore.getState().token}`
                },
                data: {
                    "qty": { [id]: qyt }
                },
            }).then((res) => {
                toast.success(res.data.message);
                set({ cartData: res.data.data});
            }).catch((error) => {
                set({ cartLoading: false });
                console.error(error);
            });
        },
        moveToWhishList: (id, locale) => {
            set({ cartLoading: true });
            axios({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart/move-to-wishlist/${id}`,

                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${useUserStore.getState().token}`
                },
            }).then((res) => {
                toast.success(res.data.message);
                set({ cartData: res.data.data, cartLoading: false });
                toast.success(res.data.message);
            }).catch((error) => {
                set({ cartLoading: false });
                console.error(error);
            });
        },
        applyCoupon: async (locale, data) => {
            set({ cartLoading: true });
            await axios({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart/coupon`,
                params: {
                    locale: locale.slice(0, 2)
                },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${useUserStore.getState().token}`
                },
                data,
            }).then((res) => {
                toast.success(res.data.message);
                console.log(res);
            }).catch((error) => {
                set({ cartLoading: false });
                console.error(error);
            });
        },
        removeCoupon: async (locale) => {
            set({ cartLoading: true });
            await axios({
                method: "DELETE",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart/coupon`,
                params: {
                    locale: locale,
                    currency: currencyStore.getState().selectedCurrency.code
                },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${useUserStore.getState().token}`
                },
            }).then((res) => {
                toast.success(res.data.message);
            }).catch((error) => {
                set({ cartLoading: false });
                console.error(error);
            });
        },
        saveCheckoutAddress: async (data, locale, closeModal) => {
            set({ cartLoading: true, savedAddress: [] });
            await axios({
                method: "post",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/checkout/save-address`,
                params: {
                    locale: locale,
                    currency: currencyStore.getState().selectedCurrency.code
                },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${useUserStore.getState().token}`
                },
                data: {
                    billing: data,
                    shipping: data,
                    register_device_id: useUserStore.getState().registeredDeviceID
                },
            }).then((res) => {
                toast.success(res.data.message);
                set({
                    rates: res.data.data.rates,
                    savedAddress: res.data.data.cart.billing_address,
                    cartData: res.data.data.cart
                });
                if (closeModal) {
                    closeModal();
                }
            }).catch((error) => {
                set({ cartLoading: false });
                toast.error(error.message)
                console.error(error);
            });
        },
        saveCheckoutShipping: async (data, locale) => {
            await axios({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/checkout/save-shipping`,
                params: {
                    locale: locale,
                    currency: currencyStore.getState().selectedCurrency.code
                },
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${useUserStore.getState().token}`
                },
                data,
            }).then((res) => {
                toast.success(res.data.message);
                console.log(res.data.data.cart);
                set({
                    paymentMethods: res.data.data.methods,
                    // cartData: res.data.cart
                });
            }).catch((error) => {
                set({ cartLoading: false });
                console.error(error);
            });
        },
        saveCheckoutOrder: async (locale) => {
            await axios({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/checkout/save-order`,
                params: {
                    locale: locale,
                    currency: currencyStore.getState().selectedCurrency.code
                },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${useUserStore.getState().token}`
                },
                data: {
                    cart_id: get().cartData.id,
                    register_device_id: useUserStore.getState().registeredDeviceID
                }
            }).then((res) => {
                set({ redirect_url: res.data.data.redirect_url });
                if (typeof window !== "undefined" && res.data.data.redirect_url) {
                    window.location = res.data.data.redirect_url
                }
            }).catch((error) => {
                set({ cartLoading: false });
                console.error(error);
            });
        },
        saveCheckoutPayment: async (data, locale) => {
            await axios({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/checkout/save-payment`,
                params: {
                    locale: locale,
                    currency: currencyStore.getState().selectedCurrency.code
                },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${useUserStore.getState().token}`
                },
                data: {
                    payment: {
                        method: data.payment_method,
                    },
                    register_device_id: useUserStore.getState().registeredDeviceID
                },
            }).then((res) => {
                toast.success(res.data.message);
                set({ orderDetails: res.data.data });
            }).catch((error) => {
                set({ cartLoading: false });
                console.error(error);
            });
        },
    })
);


export default useCartStore;
