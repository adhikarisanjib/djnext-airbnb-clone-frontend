'use client'

import { format } from "date-fns";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import PropertyListItem from "./PropertyListItem";
import apiService from "@/app/services/apiService";

import useSearchModal from "@/app/hooks/useSearchModal";


export type PropertyType = {
    id: string;
    title: string;
    price_per_night: number;
    image_url: string;
    is_favourite: boolean;
}

interface PropertyListProps {
    landloard_id?: string | null;
    favourites?: boolean | null;
}

const PropertyList: React.FC<PropertyListProps> = ({landloard_id, favourites}) => {

    const params = useSearchParams();

    const searchModal = useSearchModal();
    const country = searchModal.query.country;
    const checkIn = searchModal.query.checkIn;
    const checkOut = searchModal.query.checkOut;
    const guests = searchModal.query.guests;
    const bedrooms = searchModal.query.bedrooms;
    const bathrooms = searchModal.query.bathrooms;
    const category = searchModal.query.category;

    const [properties, setProperties] = useState<PropertyType[]>([]);

    const markFavourite = (id: string, is_favorite: boolean) => {
        const tmpProperties = properties.map((property: PropertyType) => {
            if (property.id === id) {
                property.is_favourite = is_favorite;

                if (is_favorite) {
                    console.log("Added to favourites");
                } else {
                    console.log("Removed from favourites");
                }
            }
            return property;
        });
        setProperties(tmpProperties);
    }

    console.log("query", searchModal.query);
    console.log(country, checkIn, checkOut, guests, bedrooms, bathrooms, category);

    const getProperties = async () => {
        let url = "/api/properties/"

        if (landloard_id) {
            url += `?landlord_id=${landloard_id}`
        } else if (favourites) {
            url += `?is_favourites=true`
        } else {
            console.log("inside else block")
            let urlQuery = ''

            if (country) {
                urlQuery += `country=` + country
            }

            if (checkIn) {
                urlQuery += `&checkIn=` + format(checkIn, 'yyyy-MM-dd')
            }

            if (checkOut) {
                urlQuery += `&checkOut=` + format(checkOut, 'yyyy-MM-dd')
            }

            if (guests) {
                urlQuery += `&numGuests=` + guests
            }

            if (bedrooms) {
                urlQuery += `&numBedrooms=` + bedrooms
            }

            if (bathrooms) {
                urlQuery += `&numBathrooms=` + bathrooms
            }

            if (category) {
                urlQuery += `&category=` + category
            }

            if (urlQuery.length) {
                url += `?${urlQuery}`
            }
        }

        const tmpProperties = await apiService.get(url);

        setProperties(tmpProperties.data.map((property: PropertyType) => {
            if (tmpProperties.favourites.includes(property.id)) {
                property.is_favourite = true;
            } else {
                property.is_favourite = false;
            }

            return property;
        }));
    };

    useEffect(() => {
        getProperties();
    }, [category, searchModal.query, params]);

    return (
        <>
            {properties.length >= 1 && properties.map((property) => {
                return (
                    <PropertyListItem 
                        key={property.id} 
                        property={property} 
                        markFavourite={(is_favorite: boolean) => markFavourite(property.id, is_favorite)}
                    />
                )
            })}
        </>
    )
};

export default PropertyList;
