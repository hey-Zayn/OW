"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/contact');
        if (response.data.success) {
          setContacts(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch contacts");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-300 dark:border-gray-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4 md:p-8 w-full">
      <h1 className="text-3xl font-bold text-stone-900 dark:text-white mb-8">Contact Submissions</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 w-full">
        <div className="w-full">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 dark:text-gray-300 uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 dark:text-gray-300 uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 dark:text-gray-300 uppercase tracking-wider">Job Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 dark:text-gray-300 uppercase tracking-wider">Source</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 dark:text-gray-300 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-stone-900 dark:text-white">{contact.fullName}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-stone-600 dark:text-gray-300">{contact.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-stone-600 dark:text-gray-300">{contact.company || '-'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-stone-600 dark:text-gray-300">{contact.phone}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-stone-600 dark:text-gray-300">{contact.job || '-'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-stone-600 dark:text-gray-300">{contact.source || '-'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-stone-600 dark:text-gray-300">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
