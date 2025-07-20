"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete('/api/contact', { data: { id } });
      if (response.data.success) {
        toast.success("Contact deleted successfully");
        fetchContacts(); // Refresh the list after deletion
      }
    } catch (error) {
      toast.error("Failed to delete contact");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-yellow-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 p-4 md:p-8 w-full">
      <h1 className="text-3xl font-bold text-black mb-8">Contact Submissions</h1>
      
      <div className="bg-white rounded-xl shadow-lg border border-yellow-200 w-full">
        <div className="w-full overflow-x-auto">
          <table className="w-full divide-y divide-yellow-200">
            <thead className="bg-yellow-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Job Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Source</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-200">
              {contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-yellow-50 transition-colors duration-150">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-black">{contact.fullName}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-black">{contact.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-black">{contact.company || '-'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-black">{contact.phone}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-black">{contact.job || '-'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-black">{contact.source || '-'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-black">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-black">
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                    >
                      Delete
                    </button>
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
