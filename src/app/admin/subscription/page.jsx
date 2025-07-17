'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubscriptions = async () => {
        try {
            const res = await axios.get('/api/email');
            const formattedEmails = res.data.emails.map(email => ({
                ...email,
                createdAt: new Date(email.date || email.createdAt)
            }));
            setEmails(formattedEmails);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
            toast.error('Failed to load subscriptions');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/email?id=${id}`);
            toast.success('Subscription removed successfully');
            fetchSubscriptions();
        } catch (error) {
            console.error('Error deleting subscription:', error);
            toast.error('Failed to remove subscription');
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-yellow-50/10 backdrop-blur-lg rounded-xl shadow-lg border border-yellow-200/30 p-6">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                        Email Subscriptions
                    </h1>
                    <div className="text-sm text-yellow-600">
                        {emails.length} {emails.length === 1 ? 'subscription' : 'subscriptions'}
                    </div>
                </div>
                
                <div className="overflow-hidden rounded-lg border border-yellow-200/30">
                    <table className="min-w-full divide-y divide-yellow-200/20">
                        <thead className="bg-yellow-50/20">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-900 uppercase tracking-wider">
                                    Email Address
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-900 uppercase tracking-wider">
                                    Subscription Date
                                </th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-yellow-900 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-yellow-200/10">
                            {emails.length > 0 ? (
                                emails.map((email) => (
                                    <tr key={email._id} className="hover:bg-yellow-50/30 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {email.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-700">
                                            {new Date(email.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(email._id)}
                                                className="text-red-600 hover:text-red-800 transition-colors px-3 py-1 rounded-md hover:bg-red-400/50"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-8 text-center">
                                        <div className="text-yellow-700/80 text-sm">
                                            No email subscriptions found
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Page;