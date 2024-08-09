import Image from 'next/image';
import Link from 'next/link';

import ReservationSideBar from '@/app/components/properties/ReservationSideBar';

import apiService from '@/app/services/apiService';
import { getUserId } from '@/app/lib/actions';


const PropertyDetailPage = async ({params}: {params: {id: string}}) => {
    const property = await apiService.get(`/api/properties/${params.id}`);
    const userId = await getUserId();

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <Image 
                    fill
                    src={property.data.image_url}
                    alt="property-image"
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">Property Name: {property.data.title}</h1>
                    <span className="mb-6 block text-lg text-gray-600">
                        {property.data.max_guests} guests - {property.data.bedrooms} bedrooms - {property.data.bathrooms} bathroom
                    </span>
                    <hr />
                    <Link
                        href={`/landlords/${property.data.landloard.id}`} 
                        className="py-6 flex items-center space-x-4">
                        {property.data.landloard.avatar_url && (
                            <Image 
                                src={property.data.landloard.avatar_url} 
                                alt="profile-pic" 
                                width={50} 
                                height={50} 
                                className="rounded-full" 
                            />)
                        }
                        <p> <strong>{property.data.landloard.name}</strong> is your host</p>
                    </Link>
                    <hr />
                    <p className="mt-6 text-lg">
                        {property.data.description}
                    </p>
                </div>

                <ReservationSideBar property={property.data} userId={userId} />
            </div>
        </main>
    )
};

export default PropertyDetailPage;
