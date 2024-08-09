'use client';

import React, { useEffect, useState, useRef, use } from "react";

import useWebSocket from "react-use-websocket";

import CustomButton from "../forms/CustomButton";

import { ConversationType } from "@/app/inbox/page";
import { UserType } from "@/app/inbox/page";
import { MessageType } from "@/app/inbox/[id]/page";
import { set } from "date-fns";


interface ConversationDetailProps {
    conversation: ConversationType;
    userId: string;
    token: string;
    messages: MessageType[];
}


const ConversationDetail: React.FC<ConversationDetailProps> = ({conversation, userId, token, messages}) => {
    const myUser = conversation.users?.find(user => user.id === userId);
    const otherUser = conversation.users?.find(user => user.id !== userId);

    const [newMessage, setNewMessage] = useState('');
    const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);

    const messagesDiv = useRef<HTMLDivElement>(null);

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`, {
        share: false,
        shouldReconnect: () => true,
    });

    useEffect(() => {
        console.log(readyState);
    }, [readyState])

    useEffect(() => {
        if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage) {
            const message: MessageType = {
                id: "",
                name: lastJsonMessage.name as string,
                body: lastJsonMessage.body as string,
                sent_to: otherUser as UserType,
                created_by: myUser as UserType,
                conversationId: conversation.id,
            }
            setRealtimeMessages((realtimeMessages) => [...realtimeMessages, message]);
        }
        scrollToBottom();
    }, [lastJsonMessage])

    const sendMessage = () => {
        sendJsonMessage({
            "event": "chat_message",
            "data": {
                "body": newMessage,
                "name": myUser?.name,
                "sent_to_id": otherUser?.id,
                "conversation_id": conversation.id,
            }
        });

        setNewMessage('');

        setTimeout(() => {
            scrollToBottom();
        }, 50);
    }

    const scrollToBottom = () => {
        if (messagesDiv.current) {
            messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
        }
    }

    return (
        <>
            <div ref={messagesDiv} className="max-h-[400px] overflow-auto flex flex-col space-y-4">

                {messages.map((message, index) => {
                    console.log(message);
                    return (
                        <div
                            key={index}
                            className={`${message.created_by.name === myUser?.name ? 'w-[80%] ml-[20%] md:w-[60%] md:ml-[40%] bg-blue-200' : 'w-[80%] md:w-[60%] bg-gray-200'} rounded-xl p-6`}
                        >
                            <p className="font-bold text-gray-500">{message.created_by.name}</p>
                            <p>{message.body}</p>
                        </div>
                    )
                })}

                {realtimeMessages.map((message, index) => {
                    return (
                        <div
                            key={index}
                            className={`${message.name === myUser?.name ? 'w-[80%] ml-[20%] md:w-[60%] md:ml-[40%] bg-blue-200' : 'w-[80%] md:w-[60%] bg-gray-200'} rounded-xl p-6`}
                        >
                            <p className="font-bold text-gray-500">{message.name}</p>
                            <p>{message.body}</p>
                        </div>
                    )
                })}

            </div>

            <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input 
                    type="text" 
                    placeholder="Type your message..."  
                    className="w-full py-2 px-4 bg-gray-200 rounded-xl"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <CustomButton 
                    label="Send"
                    className="w-[100px]"
                    onClick={sendMessage}
                />
            </div>
        </>
    )
};

export default ConversationDetail;
