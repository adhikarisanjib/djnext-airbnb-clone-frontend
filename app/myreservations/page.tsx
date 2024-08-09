import Image from "next/image";
import Link from "next/link";

import apiService from "../services/apiService";


const MyReservationsPage = async () => {
    const reservations = await apiService.get("/api/auth/reservations/");

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <h1 className="my-6 text-2xl"> My Reservations</h1>

            <div className="space-y-4">

                {reservations.map((reservation: any) => {
                    return (
                        <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                            <div className="col-span-1">
                                <div className="relative overflow-hidden aspect-square rounded-xl">
                                    <Image 
                                        fill
                                        src={reservation.property.image_url} 
                                        alt="reserved-property-image"
                                        className="hover:scale-110 object-cover transition h-full w-full"
                                    />
                                </div>
                            </div>
                            
                            <div className="col-span-1"></div>

                            <div className="colspan-2">
                                <h2 className="mb-4 text-xl">{reservation.property.title}</h2>

                                <p className="mb-2"><strong>Check in date:</strong> {reservation.start_date}</p>
                                <p className="mb-2"><strong>Check out date:</strong> {reservation.end_date}</p>

                                <p className="mb-2"><strong>Number of nighhts:</strong> {reservation.number_of_nights}</p>
                                <p className="mb-2"><strong>Total Price:</strong> ${reservation.total_price}</p>

                                <Link 
                                    href={`/properties/${reservation.property.id}`}
                                    className="mt-6 py-4 px-6 inline-block cursor-pointer text-white rounded-xl bg-airbnb hover:bg-airbnb-dark"
                                >
                                    Go to property
                                </Link>
                            </div>
                        </div>
                    )
                })}

            </div>

        </main>
    )
};

export default MyReservationsPage;
