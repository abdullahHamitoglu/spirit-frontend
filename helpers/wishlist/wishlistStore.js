import axios from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import useUserStore from '../user/userStore';
import Router from 'next/router'


const useWishListStore = create(
    persist(
        (set, get) => ({
            wishListItems: [],
            wishListLoading: false,

            wishList: async (method, id, moveToCart) => {
                set({ wishListLoading: true });
                axios({
                    validateStatus: false,
                    method: method,
                    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/wishlist${id != undefined ? '/' + id : ''}${moveToCart ? '/move-to-cart' : ''}`,

                            withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${useUserStore.getState().token}`
                    },
                }).then((res) => {
                    set({ wishListItems: res.data.data, wishListLoading: false });
                    if (method == 'post') {
                        toast.success(res.data.message);
                    }
                }).catch((error) => {
                    set({ wishListLoading: false });
                    console.error(error);
                });
            },
        }),
        {
            name: 'wishList-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);


export default useWishListStore;
