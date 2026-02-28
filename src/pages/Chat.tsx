import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';

interface Message {
    id: string;
    senderId: number | 'me';
    text: string;
    timestamp: string;
}

const mockMessagesRecord: Record<number, Message[]> = {
    1: [
        { id: '1', senderId: 1, text: 'Are we running the raid tonight?', timestamp: '10:45 AM' },
        { id: '2', senderId: 'me', text: 'Yeah, just let me finish this level first.', timestamp: '10:48 AM' },
        { id: '3', senderId: 1, text: 'Sweet, invite me when ready.', timestamp: '10:50 AM' },
    ],
    2: [
        { id: '1', senderId: 2, text: 'Did you see the new PS Plus games?', timestamp: 'YESTERDAY' },
        { id: '2', senderId: 'me', text: 'Yes! Finally some good RPGs.', timestamp: 'YESTERDAY' },
    ],
    3: [
        { id: '1', senderId: 3, text: 'Need help with the Venom boss fight...', timestamp: '2:15 PM' },
    ]
};

export default function Chat() {
    const { friends } = useApp();
    const [activeFriendId, setActiveFriendId] = useState<number | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const activeFriend = friends.find(f => f.id === activeFriendId);

    useEffect(() => {
        if (activeFriendId) {
            setMessages(mockMessagesRecord[activeFriendId] || []);
        } else {
            setMessages([]);
        }
    }, [activeFriendId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        // Lock outer scroll when Chat is mounted
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || !activeFriendId) return;

        const newMsg: Message = {
            id: Date.now().toString(),
            senderId: 'me',
            text: inputText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prev => [...prev, newMsg]);
        setInputText('');

        // Simulate a reply
        setTimeout(() => {
            const replyMsg: Message = {
                id: (Date.now() + 1).toString(),
                senderId: activeFriendId,
                text: 'I totally agree man.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, replyMsg]);
        }, 1500 + Math.random() * 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex h-[calc(100vh-2rem)] w-full max-w-[1600px] mx-auto my-4 px-6 gap-6"
        >
            {/* Left Sidebar: Friends List */}
            <div className="w-1/3 ps-glass rounded-2xl flex flex-col overflow-hidden border border-ps-border">
                <div className="p-4 border-b border-ps-border bg-ps-surface-2/50 backdrop-blur-md">
                    <h2 className="font-rajdhani font-bold text-xl text-white tracking-widest uppercase">Messages</h2>
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 custom-scrollbar">
                    {friends.map((friend) => (
                        <div
                            key={friend.id}
                            onClick={() => setActiveFriendId(friend.id)}
                            className={`flex items-center gap-3 p-3 mb-1 rounded-xl cursor-pointer transition-all ${activeFriendId === friend.id
                                ? 'bg-ps-blue/20 border border-ps-blue/50'
                                : 'hover:bg-ps-surface-2 border border-transparent'
                                }`}
                        >
                            <div className="relative shrink-0">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.seed}&backgroundColor=b6e3f4`}
                                    alt={friend.name}
                                    className="w-12 h-12 rounded-full border-2 border-ps-surface bg-white"
                                />
                                <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-ps-surface ${friend.status === 'online' ? 'bg-green-500' :
                                    friend.status === 'ingame' ? 'bg-ps-blue' :
                                        friend.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                                    }`} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="font-bold text-sm text-white truncate">{friend.name}</h3>
                                </div>
                                <p className="text-xs text-ps-secondary truncate">
                                    {friend.status === 'ingame' ? `Playing ${friend.currentGame}` :
                                        friend.status === 'online' ? 'Online' : 'Offline'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Main Area: Active Chat */}
            <div className="w-2/3 ps-glass rounded-2xl flex flex-col border border-ps-border overflow-hidden relative">
                {activeFriend ? (
                    <>
                        {/* Chat Header */}
                        <div className="flex items-center gap-4 p-4 border-b border-ps-border bg-ps-surface-2/80 backdrop-blur-md">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeFriend.seed}&backgroundColor=b6e3f4`}
                                alt={activeFriend.name}
                                className="w-10 h-10 rounded-full bg-white shadow-lg"
                            />
                            <div>
                                <h2 className="font-bold text-white text-lg">{activeFriend.name}</h2>
                                <p className="text-xs text-ps-neon tracking-wider uppercase font-rajdhani">
                                    {activeFriend.status === 'ingame' ? `Playing ${activeFriend.currentGame}` : 'Online'}
                                </p>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
                            {messages.length === 0 ? (
                                <div className="m-auto text-center text-ps-secondary text-sm">
                                    <p>No messages here yet.</p>
                                    <p>Send a message to start chatting!</p>
                                </div>
                            ) : (
                                messages.map((msg) => {
                                    const isMe = msg.senderId === 'me';
                                    return (
                                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${isMe
                                                ? 'bg-ps-blue text-white rounded-br-sm shadow-[0_4px_16px_rgba(0,112,204,0.3)]'
                                                : 'ps-glass-light text-gray-200 rounded-bl-sm'
                                                }`}>
                                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                                <span className={`text-[10px] mt-1 block ${isMe ? 'text-blue-200 text-right' : 'text-ps-secondary'}`}>
                                                    {msg.timestamp}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 bg-ps-surface border-t border-ps-border">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder={`Message ${activeFriend.name}...`}
                                    className="flex-1 bg-black border border-ps-border/80 shadow-inner rounded-full px-5 py-3 text-sm text-white focus:outline-none focus:border-ps-blue focus:ring-1 focus:ring-ps-blue/50 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputText.trim()}
                                    className="bg-ps-blue hover:bg-ps-blue/80 disabled:opacity-50 disabled:cursor-not-allowed text-white w-11 h-11 rounded-full flex justify-center items-center transition-all shadow-[0_0_15px_rgba(0,112,204,0.3)] hover:shadow-[0_0_25px_rgba(0,112,204,0.5)]"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 ml-0.5">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-ps-secondary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-16 h-16 mb-4 opacity-50">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        <h3 className="font-rajdhani font-bold text-xl text-white mb-2">Your Messages</h3>
                        <p className="text-sm px-8 text-center">Select a friend from the sidebar to view their messages or start a new party chat.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
