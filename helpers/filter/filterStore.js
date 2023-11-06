// userStore.js
import { create } from 'zustand';



const useFilterStore = create(
    (set, get) => ({
        currency: '',
        search: '',
        option: '',
        brand: '',
        price: '',
        page: 1,
        category: '',
        brand_id: '',
        setCurrency: (val) => set({ valency: val }),
        setSearch: (val) => set({ search: val }),
        setOption: (val) => set({ option: val }),
        setBrand: (val) => set({ brand: val }),
        setPrice: (val) => set({ price: val }),
        setPage: (val) => set({ page: val }),
        setCategory: (val) => set({ category: val }),
        setBrand_id: (val) => set({ brand_id: val }),
    })
);

export default useFilterStore;