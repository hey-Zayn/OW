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
    <div className="min-h-screen bg-white/10 backdrop-blur-lg p-4 md:p-8 w-full">
      <h1 className="text-3xl font-bold text-white mb-8">Contact Submissions</h1>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-red-200/30 w-full">
        <div className="w-full overflow-x-auto">
          <table className="w-full divide-y divide-red-200/30">
            <thead className="bg-red-50/10">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-red-100/90 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-red-100/90 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-red-100/90 uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-red-100/90 uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-red-100/90 uppercase tracking-wider">Job Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-red-100/90 uppercase tracking-wider">Source</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-red-100/90 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-200/30">
              {contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-red-50/20 transition-colors duration-150">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">{contact.fullName}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{contact.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-red-100/80">{contact.company || '-'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{contact.phone}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-red-100/80">{contact.job || '-'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-red-100/80">{contact.source || '-'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-red-100/80">
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
