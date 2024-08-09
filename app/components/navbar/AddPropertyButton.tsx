'use client'

import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import useLoginModal from "@/app/hooks/useLoginModal";


interface AddPropertyButtonProps {
    userId?: string | null;
}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({userId}) => {

    const addPropertyModal = useAddPropertyModal();
    const loginModal = useLoginModal();

    const airbnbYourHome = () => {
        if (userId) {
            addPropertyModal.open();
        } else {
            loginModal.open();
        }
    };

    return (
        <div 
            className="cursor-pointer p-2 text-sm font-semibold rounded-full hover:bg-gray-200"
            onClick={airbnbYourHome}
        >
            Djangobnb your home
        </div>
    )
}

export default AddPropertyButton;
