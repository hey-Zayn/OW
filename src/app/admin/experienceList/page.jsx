"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function page() {
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const response = await fetch('/api/experience', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch experience data');
        }
        
        const { data } = await response.json();
        setExperienceData(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperienceData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/experience`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete experience');
      }
      
      const { data: deletedExperience } = await response.json();
      setExperienceData(experienceData.filter(item => item._id !== deletedExperience._id));
      toast.success('Experience deleted successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="text-yellow-500 text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Experience List</h1>
        <Link href="/admin/addexperience" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
          Add New
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-yellow-500">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {experienceData.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-black">{item.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-black">{item.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-black">{item.duration}</td>
                <td className="px-6 py-4 text-black">
                  {item.description.length > 100 
                    ? `${item.description.substring(0, 100)}...` 
                    : item.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <Link 
                      href={`/admin/experienceList/edit/${item._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
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
