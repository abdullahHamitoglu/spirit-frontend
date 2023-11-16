import axios from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import useUserStore from '../user/userStore';


const useCartStore = create(
    (set, get) => ({
        cartData: [],
        cartLoading: false,
        count: 0,
        increment: () => {
            set((state) => ({ count: state.count > -1 ? state.count + 1 : state.count }))
        },
        decrement: () => set((state) => ({ count: state.count - 1 })),
        getCart: () => {
            set({ cartLoading: true });
            axios({
                method: "GET",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart`,
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
        addToCart: (data) => {
            set({ cartLoading: true });
            axios({
                method: "post",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart/add`,
                headers: {
                    'Authorization': `Bearer ${useUserStore.getState().token}`
                },
                data,
            }).then((res) => {
                set({ cartData: res.data.data, cartLoading: false });
                toast.success(res.data.message);
                get().getCart();
            }).catch((error) => {
                set({ cartLoading: false })
                console.error(error);
            });
        },
        removeFromCart: (id ) => {
            set({ cartLoading: true });
            axios({
                method: "DELETE",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart/remove/${id}`,
                headers: {
                    'Authorization': `Bearer ${useUserStore.getState().token}`
                },
                
            }).then((res) => {
                toast.success(res.data.message);
                get().getCart();
            }).catch((error) => {
                set({ cartLoading: false })
                console.error(error);
            });
        },
        emptyFromCart: () => {
            set({ cartLoading: true });
            axios({
                method: "DELETE",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart/empty`,
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
        updateQty: (id, qyt) => {
            set({ cartLoading: true });
            axios({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart/update`,
                headers: {
                    'Authorization': `Bearer ${useUserStore.getState().token}`
                },
                data: {
                    qyt: JSON.parse(`{ ${id} : ${qyt} }`)
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
        moveToWhishList: (id) => {
            set({ cartLoading: true });
            axios({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart/move-to-wishlist/${id}`,
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
        applyCoupon: (code) => {
            set({ cartLoading: true });
            axios({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart/coupon`,
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
                console.error(error);
            });
        },
        removeCoupon: () => {
            set({ cartLoading: true });
            axios({
                method: "DELETE",
                url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart/coupon`,
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
    })
);


export default useCartStore;
