import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function TableList({ tableData, setTableData, handleOpen, searchTerm }) {
  const [error, setError] = useState(null);

  const filtered = tableData.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized. Please login again.');
        return;
      }

      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTableData((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Delete failed.');
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded shadow">
          {error}
        </div>
      )}
      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
          <tr>
            <th className="py-3 px-5 text-center border-b">#</th>
            <th className="py-3 px-5 text-left border-b">Name</th>
            <th className="py-3 px-5 text-left border-b">Category</th>
            <th className="py-3 px-5 text-right border-b">Price</th>
            <th className="py-3 px-5 text-center border-b">Status</th>
            <th className="py-3 px-5 text-center border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((p, i) => (
              <tr
                key={p._id}
                className={`transition hover:bg-gray-50 ${!p.isActive ? 'bg-yellow-50' : ''}`}
              >
                <td className="py-3 px-5 text-center border-b">{i + 1}</td>
                <td className="py-3 px-5 border-b">{p.name}</td>
                <td className="py-3 px-5 border-b">{p.category}</td>
                <td className="py-3 px-5 text-right border-b">
                  ${p.price?.toFixed(2)}
                </td>
                <td className="py-3 px-5 text-center border-b">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      p.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {p.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-3 px-5 text-center border-b space-x-2">
                  <button
                    onClick={() => handleOpen('edit', p)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-md shadow transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded-md shadow transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

TableList.propTypes = {
  tableData: PropTypes.array.isRequired,
  setTableData: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};
