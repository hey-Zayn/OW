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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-red-200/30 p-6">
                <h1 className="text-2xl font-bold text-white mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-500">
                    Email Subscriptions
                </h1>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-red-200/30">
                        <thead className="bg-red-50/10">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-red-100/90 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-red-100/90 uppercase tracking-wider">Date Subscribed</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-red-100/90 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-red-200/30">
                            {emails.length > 0 ? (
                                emails.map((email) => (
                                    <tr key={email._id} className="hover:bg-red-50/20 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{email.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-100/80">
                                            {new Date(email.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(email._id)}
                                                className="text-red-400 hover:text-red-300 transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center text-sm text-red-100/80">
                                        No subscriptions found
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