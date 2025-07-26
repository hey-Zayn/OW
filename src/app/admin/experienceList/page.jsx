"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PAGE_SIZE = 5;

export default function Page() {
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

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

  // Pagination logic
  const totalPages = Math.ceil(experienceData.length / PAGE_SIZE);
  const paginatedData = experienceData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) return <div className="text-yellow-500 text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="w-full px-0 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3 px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Experience List</h1>
        <Link
          href="/admin/addexperience"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1.5 px-4 rounded text-xs sm:text-sm shadow transition"
        >
          Add New
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto w-full">
        <table className="min-w-full w-full text-xs sm:text-sm">
          <thead className="bg-yellow-500">
            <tr>
              <th className="px-2 sm:px-3 py-2 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap">Company</th>
              <th className="px-2 sm:px-3 py-2 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap">Position</th>
              <th className="px-2 sm:px-3 py-2 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap">Duration</th>
              <th className="px-2 sm:px-3 py-2 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap">Description</th>
              <th className="px-2 sm:px-3 py-2 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No experience records found.
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition">
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap text-black">{item.company}</td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap text-black">{item.position}</td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap text-black">{item.duration}</td>
                  <td className="px-2 sm:px-3 py-2 text-black max-w-xs truncate">
                    {item.description.length > 80
                      ? `${item.description.substring(0, 80)}...`
                      : item.description}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                    <div className="flex gap-1">
                      <Link
                        href={`/admin/experienceList/edit/${item._id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded text-xs transition"
                        title="Edit"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded text-xs transition"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 mt-4 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`py-1 px-2 rounded text-xs font-medium border border-gray-300 bg-white hover:bg-gray-100 transition disabled:opacity-50`}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              className={`py-1 px-2 rounded text-xs font-medium border ${
                currentPage === idx + 1
                  ? 'bg-yellow-500 text-white border-yellow-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              } transition`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`py-1 px-2 rounded text-xs font-medium border border-gray-300 bg-white hover:bg-gray-100 transition disabled:opacity-50`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
