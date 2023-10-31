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
                    method: method,
                    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/wishlist${id != undefined ? '/' + id : ''}${moveToCart ? '/move-to-cart' : ''}`,
                    headers: {
                        'Authorization': `Bearer ${useUserStore.getState().token}`
                    },
                }).then((res) => {
                    set({ wishListItems: res.data.data , wishListLoading: false });
                    if (method == 'post') {
                        toast.success(res.data.message);
                    }
                }).catch((error) => {
                    set({ wishListLoading: false });
                    if(error.response.status == 401){
                        router.push(`/account/login?redirect_url=${router.asPath}`);
                    }
                    console.log(error);
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
