"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function page() {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/about');
        if (!response.ok) {
          throw new Error('Failed to fetch about data');
        }
        const data = await response.json();
        setAboutData(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this about entry?')) {
      try {
        const response = await fetch(`/api/about?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to delete about entry');
        }

        // Refresh the list after deletion
        setAboutData(aboutData.filter(item => item._id !== id));
        toast.success('About entry deleted successfully');
      } catch (err) {
        console.error('Error deleting about entry:', err);
        toast.error(err.message);
      }
    }
  };

  if (loading) return <div className="text-yellow-500 text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">About List</h1>
        <Link href="/admin/addabout" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
          Add New
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-yellow-500">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Heading</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {aboutData.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.heading} 
                      className="h-16 w-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black">{item.heading}</td>
                <td className="px-6 py-4 text-black max-w-xs truncate">{item.details.substring(0, 100)}{item.details.length > 100 ? '...' : ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link 
                      href={`/admin/aboutList/edit/${item._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-3 rounded-md text-sm transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
