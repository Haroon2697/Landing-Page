// src/components/TableComponent.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const TableComponent = () => {
  const [data, setData] = useState([]); // State to store fetched data
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [rowsPerPage] = useState(10); // Rows per page
  const [error, setError] = useState(null); // State to store error messages
  const navigate = useNavigate(); // Hook to navigate between routes

  // Fetch data from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com'); // Fetch data from the API
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const result = await response.json();

        // Map the result to the required format
        const formattedData = result.map(item => ({
          id: item.id, 
          name: item.name,
          email: item.email, 
          message: item.message, 
          timestamp: item.timestamp || 'No Timestamp' 
        }));

        setData(formattedData); // Set the transformed data to the state
      } catch (error) {
        setError('Error fetching submissions. Please try again later.');
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const hideTable = () => {
    navigate('/contact');
  };

  return (
    <div className="p-8">
      {error && <p className="text-red-500">{error}</p>} {/* Display error message if present */}
      
      {data.length === 0 ? ( 
        <p className="text-center text-gray-300">No submissions available.</p>
      ) : (
        <table className="min-w-full table-auto bg-neutral-900 text-white">
          <thead>
            <tr className="text-left border-b border-neutral-700">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Timestamp</th> 
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index} className="border-b border-neutral-700">
                <td className="px-4 py-2">{row.id}</td>
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">{row.email}</td>
                <td className="px-4 py-2">{row.message}</td>
                <td className="px-4 py-2">{row.timestamp}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      {data.length > 0 && (
        <div className="flex justify-between items-center mt-4 text-gray-300">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-neutral-800 border border-neutral-700 rounded ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-neutral-800 border border-neutral-700 rounded ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Hide button */}
      <div className="mt-8 text-center">
        <button
          onClick={hideTable}
          className="text-blue-500 underline hover:text-blue-400 focus:outline-none"
        >
          Hide Table
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
