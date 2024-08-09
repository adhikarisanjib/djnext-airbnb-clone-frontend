'use client'

import { useEffect, useState } from "react";
import { DateRange, Range } from "react-date-range";
import { differenceInDays, eachDayOfInterval, set, format } from "date-fns";

import apiService from "@/app/services/apiService";
import useLoginModal from "@/app/hooks/useLoginModal";
import { parse } from "path";

import DatePicker from "../forms/Calendar";
import { get } from "http";


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};


export type Property = {
    id: number;
    price_per_night: number;
    max_guests: number;
};

interface ReservationSideBarProps {
    userId: string | null;
    property: Property;
}

const ReservationSideBar: React.FC<ReservationSideBarProps> = ({property, userId}) => {
    const loginModal = useLoginModal();

    const [fee, setFee] = useState<number>(0);
    const [nights, setNights] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [minDate, setMinDate] = useState<Date>(new Date());
    const [guests, setGuests] = useState<string>("1");
    const [bookedDates, setBookedDates] = useState<Date[]>([]);
    
    const guestRange = Array.from({length: property.max_guests}, (_, index) => index + 1);

    const _setDateRange = (selection: any) => {
        const newStartDate = new Date(selection.startDate);
        const newEndDate = new Date(selection.endDate);

        if (newEndDate <= newStartDate) {
            newEndDate.setDate(newStartDate.getDate() + 1);
        }

        setDateRange({
            startDate: newStartDate,
            endDate: newEndDate,
            key: 'selection'
        });
    }

    const getReservations = async () => {
        const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`);

        let dates: Date[] = [];
        reservations.data.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.start_date), 
                end: new Date(reservation.end_date)
            });
            dates = [...dates, ...range];
        });

        setBookedDates(dates);
    }

    useEffect(() => {
        getReservations(); 
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
            if (dayCount && property.price_per_night) {
                const _fee = ((dayCount * property.price_per_night) / 100) * 5;
                const _price_per_night = parseInt(property.price_per_night.toString());
                setFee(_fee);
                setTotalPrice((dayCount * _price_per_night) + _fee);
                setNights(dayCount);
            } else {
                const _fee = (property.price_per_night / 100) * 5;
                const _price_per_night = parseInt(property.price_per_night.toString());
                setFee(_fee);
                setTotalPrice(_price_per_night + _fee);
                setNights(1);
            }
        }
    }, [dateRange])

    const performBooking = async () => {
        if (userId) {
            if (dateRange.startDate && dateRange.endDate) {
                const formData = new FormData();
                formData.append('number_of_guests', guests);
                formData.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'));
                formData.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'));
                formData.append('number_of_nights', nights.toString());
                formData.append('total_price', totalPrice.toString());

                const response = await apiService.post(`/api/properties/${property.id}/book/`, formData);

                if (response.success) {
                    console.log('Booking successful');
                } else {
                    console.log('Booking failed');
                }
            }
        } else {
            loginModal.open();
        }
    }

    
    return (
        <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
            <h2 className="mb-5 text-2xl">${property.price_per_night} per night</h2>

            <DatePicker 
                value={dateRange}
                bookedDates={bookedDates}
                onChange={(range) => _setDateRange(range.selection)}
            />

            <div className="mb-6 p-3 border border-gray-400 rounded-xl">
                <label htmlFor="id-num-guest" className="mb-2 block font-bold text-xs">Guests</label>
                <select 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    name="num-guest" 
                    id="id-num-guest" 
                    className="w-full -ml-1 text-xs bg-white"
                >
                    {guestRange.map((guest) => (
                        <option key={guest} value={guest}>{guest}</option>
                    ))}
                </select>
            </div>

            <div 
                onClick={performBooking}
                className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl"
            >
                Book
            </div>

            <div className="mb-4 flex justify-between items-center">
                <p>${property.price_per_night} * {nights} nights</p>
                <p>${property.price_per_night * nights}</p>
            </div>

            <div className="mb-4 flex justify-between items-center">
                <p>DjangoBnb fee</p>
                <p>{fee}</p>
            </div>

            <hr />

            <div className="mt-4 flex justify-between items-center font-bold">
                <p>Total</p>
                <p>${totalPrice}</p>
            </div>
        </aside>
    )
};

export default ReservationSideBar;
