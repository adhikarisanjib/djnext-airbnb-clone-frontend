'use client';

import { useState } from "react";

import SelectCountry, {SelectCountryValue} from "../forms/SelectCountry";
import { Range } from "react-date-range";

import Modal from "./Modal"
import DatePicker from "../forms/Calendar";

import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal"
import CustomButton from "../forms/CustomButton";


const initialDateRange  = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}


const SearchModal = () => {
    const searchModal = useSearchModal();

    const [country, setCountry] = useState<SelectCountryValue>();
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const [numGuests, setNumGuests] = useState(1);
    const [numBedrooms, setNumBedrooms] = useState(0);
    const [numBatrooms, setNumBathrooms] = useState(0);


    const _setDateRange = (selection: Range) => {
        if (searchModal.step === "checkin") {
            searchModal.open("checkout");
        } else if (searchModal.step === "checkout") {
            searchModal.open("details");
        }

        setDateRange(selection);
    }

    const closeAndSearch = () => {
        const newSearchQuery: SearchQuery = {
            country: country?.label,
            checkIn: dateRange.startDate,
            checkOut: dateRange.endDate,
            guests: numGuests,
            bedrooms: numBedrooms,
            bathrooms: numBatrooms,
            category: ""
        };

        searchModal.setQuery(newSearchQuery);

        searchModal.close();
    }

    const contentLocation = (
        <>
            <h2 className="mb-6 text-2xl">Where do you want to go?</h2>
            <SelectCountry 
                value={country}
                onChange={(value) => setCountry(value as SelectCountryValue)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton 
                    label="Checkin date ->"
                    onClick={() => searchModal.open("checkin")}
                />
            </div>
        </>
    )

    const contentCheckin = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to checkin?</h2>
            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton 
                    label="<- Location"
                    onClick={() => searchModal.open("location")}
                />
                <CustomButton 
                    label="Checkout date ->"
                    onClick={() => searchModal.open("checkout")}
                />
            </div>
        </>
    )

    const contentCheckout = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to checkout?</h2>
            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton 
                    label="<- Checkin"
                    onClick={() => searchModal.open("checkin")}
                />
                <CustomButton 
                    label="Details ->"
                    onClick={() => searchModal.open("details")}
                />
            </div>
        </>
    )

    const contentDetails = (
        <>
            <h2 className="mb-6 text-2xl">Details</h2>

            <div className="space-y-4">
                <div className="space-y-4">
                    <label htmlFor="id-num-guests">Number of Gursts:</label>
                    <input 
                        type="number" 
                        min={1} 
                        value={numGuests} 
                        onChange={(e) => setNumGuests(parseInt(e.target.value))}
                        placeholder="Number of guests"
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4">
                    <label htmlFor="id-num-bedrooms">Number of Bedrooms:</label>
                    <input 
                        type="number" 
                        min={0} 
                        value={numBedrooms} 
                        onChange={(e) => setNumBedrooms(parseInt(e.target.value))}
                        placeholder="Number of bedrooms"
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4">
                    <label htmlFor="id-num-bathrooms">Number of Bathrooms:</label>
                    <input 
                        type="number" 
                        min={0} 
                        value={numBatrooms} 
                        onChange={(e) => setNumBathrooms(parseInt(e.target.value))}
                        placeholder="Number of bathrooms"
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton 
                    label="<- Checkout"
                    onClick={() => searchModal.open("checkout")}
                />
                <CustomButton 
                    label="Search"
                    onClick={closeAndSearch}
                />
            </div>
        </>
    )

    
    let content = (
        <></>
    )

    if (searchModal.step === "location") {
        content = contentLocation;
    } else if (searchModal.step === "checkin") {
        content = contentCheckin;
    } else if (searchModal.step === "checkout") {
        content = contentCheckout;
    } else if (searchModal.step === "details") {
        content = contentDetails;
    }

    return (
        <Modal 
            title="Search"
            content={content}
            isOpen={searchModal.isOpen}
            close={searchModal.close}
        />
    )
}

export default SearchModal;
