import { create } from "zustand";

interface AddPropertyModalState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddPropertyModal = create<AddPropertyModalState>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),
}));

export default useAddPropertyModal;
