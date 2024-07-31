import Image from 'next/image';

const PropertyListItem = () => {
    return (
        <div className="cursor-pointer">
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image 
                    fill 
                    src="/beach_1.jpg" 
                    alt="property-image" 
                    sizes='(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px' 
                    className='hover:scale-110 object-cover transition h-full' 
                />
            </div>

            <div className="mx-2 mt-2">
                <p className="text-lg font-bold">Property name</p>
            </div>

            <div className="mx-2 text-gray-500">
                <p className="text-sm"> 
                    <strong>200$</strong> per night
                </p>
            </div>
        </div>
    )
};

export default PropertyListItem;
