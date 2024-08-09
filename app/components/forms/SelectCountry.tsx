'use client'

import Select from "react-select"

import useCountries from "@/app/hooks/useCountries"
import { get } from "https";


export type SelectCountryValue = {
    label: string;
    value: string;
}


interface SelectCountryProps {
    value?: SelectCountryValue;
    onChange: (value: SelectCountryValue) => void;
}


const SelectCountry: React.FC<SelectCountryProps> = ({ value, onChange }) => {
    const countries = useCountries();
    const {getAll} = useCountries(); 

    return (
        <>
            <Select 
                isClearable
                placeholder="Select Country"
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as SelectCountryValue)}
            />
        </>
    )
}

export default SelectCountry;
