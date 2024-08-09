import { create } from "zustand";


export type SearchQuery = {
    country: string | undefined;
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    guests: number;
    bathrooms: number;
    bedrooms: number;
    category: string;
}

interface SearchModalState {
    isOpen: boolean;
    step: string;
    open: (step: string) => void;
    close: () => void;
    query: SearchQuery;
    setQuery: (query: SearchQuery) => void;
}

const useSearchModal = create<SearchModalState>((set) => ({
    isOpen: false,
    step: "",
    open: (step) => set({isOpen: true, step: step}),
    close: () => set({isOpen: false}),
    query: {
        country: "",
        checkIn: undefined,
        checkOut: undefined,
        guests: 1,
        bathrooms: 1,
        bedrooms: 1,
        category: ""
    },
    setQuery: (query) => set({query})
}));

export default useSearchModal;
