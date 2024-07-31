'use client';

import CustomButton from "../forms/CustomButton";

const ConversationDetail = () => {
    return (
        <>
            <div className="max-h-[400px] overflow-auto flex flex-col space-y-4">
                <div className="w-[80%] md:w-[60%] bg-gray-200 rounded-xl p-6">
                    <p className="font-bold text-gray-500">John Doe</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>

                <div className="w-[80%] ml-[20%] md:w-[60%] md:ml-[40%] bg-blue-200 rounded-xl p-6">
                    <p className="font-bold text-gray-500">Adhikari</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>

            <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input type="text" placeholder="Type your message..."  className="w-full py-2 px-4 bg-gray-200 rounded-xl"/>
                <CustomButton 
                    label="Send"
                    className="w-[100px]"
                    onClick={() => console.log("Clicked")}
                />
            </div>
        </>
    )
};

export default ConversationDetail;
