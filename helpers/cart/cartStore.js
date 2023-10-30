import axios from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import useUserStore from '../user/userStore';


const useCartStore = create(
    persist(
        (set, get) => ({
            carItems: [],
            cartLoading: false,
            count: 0,
            increment: () => {
                set((state) => ({ count: state.count > -1 ? state.count + 1 : state.count }))
            },
            decrement: () => set((state) => ({ count: state.count - 1 })),
            getCart: () => {
                set({ cartLoading: true });
                console.log(useUserStore.getState().token);
                axios({
                    method: "GET",
                    url: `${process.env.API_URL}api/v1/customer/cart`,
                    headers: {
                        'Authorization': `Bearer ${useUserStore.getState().token}`
                    },
                }).then((res) => {
                    console.log(res);
                    set({ carItems: res.data.data, cartLoading: false });
                }).catch((error) => {
                    set({ cartLoading: false })
                    console.log(error);
                });
            },
            addToCart: (data) => {
                set({ cartLoading: true });
                axios({
                    method: "post",
                    url: `${process.env.API_URL}api/v1/customer/cart/add`,
                    headers: {
                        'Authorization': `Bearer ${useUserStore.getState().token}`
                    },
                    data,
                }).then((res) => {
                    set({ carItems: res.data.data, cartLoading: false });
                }).catch((error) => {
                    set({ cartLoading: false })
                    console.log(error);
                });
            },
            removeFromCart: (id) => {
                set({ cartLoading: true });
                axios({
                    method: "DEL",
                    url: `${process.env.API_URL}api/v1/customer/cart/remove/${id}`,
                    headers: {
                        'Authorization': `Bearer ${useUserStore.getState().token}`
                    },
                    data,
                }).then((res) => {
                    set({ carItems: res.data.data, cartLoading: false });
                }).catch((error) => {
                    set({ cartLoading: false })
                    console.log(error);
                });
            },
            emptyFromCart: () => {
                set({ cartLoading: true });
                axios({
                    method: "DEL",
                    url: `${process.env.API_URL}api/v1/customer/cart/empty`,
                    headers: {
                        'Authorization': `Bearer ${useUserStore.getState().token}`
                    },
                }).then((res) => {
                    toast.success(res.data.message)
                    set({ carItems: res.data.data, cartLoading: false });
                }).catch((error) => {
                    set({ cartLoading: false })
                    console.log(error);
                });
            },
            moveToWhishList: (id) => {
                set({ cartLoading: true });
                axios({
                    method: "POST",
                    url: `${process.env.API_URL}api/v1/customer/cart/move-to-wishlist/${id}`,
                    headers: {
                        'Authorization': `Bearer ${useUserStore.getState().token}`
                    },
                }).then((res) => {
                    toast.success(res.data.message);
                    set({ carItems: res.data.data, cartLoading: false });
                }).catch((error) => {
                    set({ cartLoading: false });
                    console.log(error);
                });
            },
            applyCoupon: (code) => {
                set({ cartLoading: true });
                axios({
                    method: "POST",
                    url: `${process.env.API_URL}api/v1/customer/cart/coupon`,
                    headers: {
                        'Authorization': `Bearer ${useUserStore.getState().token}`
                    },
                    data: {
                        "code": code
                    }
                }).then((res) => {
                    toast.success(res.data.message);
                }).catch((error) => {
                    set({ cartLoading: false });
                    console.log(error);
                });
            },
            applyCoupon: () => {
                set({ cartLoading: true });
                axios({
                    method: "DEL",
                    url: `${process.env.API_URL}api/v1/customer/cart/coupon`,
                    headers: {
                        'Authorization': `Bearer ${useUserStore.getState().token}`
                    },
                }).then((res) => {
                    toast.success(res.data.message);
                }).catch((error) => {
                    set({ cartLoading: false });
                    console.log(error);
                });
            },
        }),
        {
            name: 'cart-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);


export default useCartStore;
