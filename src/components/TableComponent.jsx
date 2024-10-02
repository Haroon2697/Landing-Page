import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPen } from 'react-icons/fa'; // Import icons for edit and delete

const TableComponent = () => {
  const [data, setData] = useState([]); // State to store fetched data
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [rowsPerPage] = useState(10); // Rows per page
  const [error, setError] = useState(null); // State to store error messages
  const [editRow, setEditRow] = useState(null); // State to track which row is being edited
  const [formData, setFormData] = useState({ name: '', email: '', msg: '' }); // State for form data
  const navigate = useNavigate(); // Hook to navigate between routes

  useEffect(() => {
    async function fetchCustomData() {
      try {
        const response = await fetch('http://localhost:3002/api/getcontact');

        if (!response.ok) {
          throw new Error('Server error. Please try again later.');
        }

        const result = await response.json(); // Parse the response as JSON
        setData(result); // Set the fetched data to state
      } catch (err) {
        setError(err.message); // Set error message for other errors
      }
    }

    fetchCustomData();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle edit button click
  const handleEditClick = (row) => {
    setEditRow(row.id); // Set the row being edited
    setFormData({ name: row.name, email: row.email, msg: row.msg }); // Populate form with current data
  };

  // Handle form submission for updating
const handleFormSubmit = async (e, rowId) => {
  e.preventDefault();
  console.log("Form data being sent:", formData); // Log form data

  try {
    const response = await fetch(`http://localhost:3002/api/updatecontact/${rowId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Get detailed error response
      throw new Error(errorData.message || 'Failed to update the contact. Please try again.');
    }

    const updatedRow = await response.json();
    console.log("Updated row received from server:", updatedRow); // Log the updated row

    // Ensure that updatedRow has the same structure as your data rows
    setData((prevData) =>
      prevData.map((row) => (row.id === rowId ? { ...row, ...updatedRow } : row))
    );

    // Clear edit state and form data after successful update
    setEditRow(null);
    setFormData({ name: '', email: '', msg: '' });
  } catch (err) {
    console.error("Update error:", err); // Log the error for further investigation
    setError(err.message); // Set error message for catching errors
  }
};


  // Handle cancel action
  const handleCancelEdit = () => {
    setEditRow(null); // Clear edit state
    setFormData({ name: '', email: '', msg: '' }); // Clear form data
  };

  // Handle delete
  const handleDelete = async (rowId) => {
    try {
      const response = await fetch(`http://localhost:3002/api/deletecontact/${rowId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the contact. Please try again.');
      }

      setData(data.filter((row) => row.id !== rowId)); // Remove the deleted row from state
    } catch (err) {
      setError(err.message);
    }
  };

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
              <th className="px-4 py-2">Actions</th> {/* Add Actions column */}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id} className="border-b border-neutral-700">
                <td className="px-4 py-2">{row.id}</td>
                <td className="px-4 py-2">
                  {editRow === row.id ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-neutral-800 text-white border border-neutral-600 rounded px-2 py-1"
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td className="px-4 py-2">
                  {editRow === row.id ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-neutral-800 text-white border border-neutral-600 rounded px-2 py-1"
                    />
                  ) : (
                    row.email
                  )}
                </td>
                <td className="px-4 py-2">
                  {editRow === row.id ? (
                    <input
                      type="text"
                      name="msg"
                      value={formData.msg}
                      onChange={handleInputChange}
                      className="bg-neutral-800 text-white border border-neutral-600 rounded px-2 py-1"
                    />
                  ) : (
                    row.msg
                  )}
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  {editRow === row.id ? (
                    <>
                      <button onClick={(e) => handleFormSubmit(e, row.id)} className="text-green-500">
                        Update
                      </button>
                      <button onClick={handleCancelEdit} className="text-red-500">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(row)} className="text-blue-500">
                        <FaPen />
                      </button>
                      <button onClick={() => handleDelete(row.id)} className="text-red-500">
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
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
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/contact')}
          className="text-blue-500 underline hover:text-blue-400 focus:outline-none"
        >
          hide Table
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
