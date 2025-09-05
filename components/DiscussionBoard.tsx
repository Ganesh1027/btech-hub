import React, { useState, useRef, useEffect } from 'react';
import { DiscussionMessage } from '../types';

interface DiscussionBoardProps {
    currentUser: { id: string; name: string; };
}

const DiscussionBoard: React.FC<DiscussionBoardProps> = ({ currentUser }) => {
    const [messages, setMessages] = useState<DiscussionMessage[]>(() => {
        try {
            const savedMessages = localStorage.getItem('studyHubMessages');
            if (savedMessages) {
                const parsed = JSON.parse(savedMessages) as DiscussionMessage[];
                // Convert timestamp strings back to Date objects
                return parsed.map(msg => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }));
            }
            return [];
        } catch (error) {
            console.error("Could not load messages from localStorage", error);
            return [];
        }
    });
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        try {
            localStorage.setItem('studyHubMessages', JSON.stringify(messages));
        } catch (error) {
            console.error("Could not save messages to localStorage", error);
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const message: DiscussionMessage = {
            id: Date.now().toString(),
            author: currentUser.name,
            authorId: currentUser.id,
            text: newMessage,
            timestamp: new Date(),
        };
        setMessages([...messages, message]);
        setNewMessage('');
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg h-[70vh] flex flex-col">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Discussion Board</h2>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center text-sm text-slate-500 dark:text-slate-400 py-8">
                            No messages yet. Start the conversation!
                        </div>
                    )}
                    {messages.map((msg) => {
                        const isCurrentUser = msg.authorId === currentUser.id;
                        return (
                            <div key={msg.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${isCurrentUser ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
                                    <p className="text-sm font-bold mb-1">{isCurrentUser ? 'You' : msg.author}</p>

                                    <p className="text-sm">{msg.text}</p>
                                    <p className={`text-xs mt-2 opacity-75 ${isCurrentUser ? 'text-indigo-200' : 'text-slate-500 dark:text-slate-400'}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                    <button type="submit" className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009.894 15V4A1 1 0 0010.894 2.553z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DiscussionBoard;