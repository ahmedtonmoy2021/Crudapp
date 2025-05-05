import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar.jsx';
import TableList from './components/TableList.jsx';
import ModalForm from './components/ModalForm.jsx';

export default function ProductApp() {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false); // For handling loading state
  const [error, setError] = useState(null); // For handling errors
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // Get token from localStorage on initial load

  // Function to fetch products from API
  const fetchProducts = async () => {
    if (!token) return; // Avoid API call if there's no token
    setLoading(true);
    setError(null); // Reset any previous errors
    try {
      const res = await axios.get('http://localhost:3000/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTableData(res.data); // Set the fetched data
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect for fetching products when component is mounted or token changes
  useEffect(() => {
    if (!token) {
      // Optionally show a message or modal to ask the user to log in if token is missing
      window.location.href = '/login'; // Redirect if there's no token
      return;
    }
    fetchProducts();
  }, [token]); // Re-fetch products only when token changes

  // Listen for token changes and update localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token); // Store token in localStorage
    } else {
      localStorage.removeItem('token'); // Remove token from localStorage if logged out
    }
  }, [token]);

  // Function to open modal for adding or editing products
  const handleOpen = (mode, prod) => {
    setProductData(prod);
    setModalMode(mode);
    setIsOpen(true);
  };

  // Function to handle form submit (add/edit products)
  const handleSubmit = async (newProd) => {
    if (!token) return; // Prevent submission if no token

    setError(null); // Reset any previous errors
    try {
      let res;
      if (modalMode === 'add') {
        res = await axios.post('http://localhost:3000/api/products', newProd, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTableData((prev) => [...prev, res.data]);
      } else if (modalMode === 'edit') {
        res = await axios.put(
          `http://localhost:3000/api/products/${productData._id}`,
          newProd,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTableData((prev) =>
          prev.map((p) => (p._id === productData._id ? res.data : p))
        );
      }
      setIsOpen(false);
      setProductData(null); // Clear modal data after submit
    } catch (err) {
      setError('Failed to submit product. Please try again later.');
      console.error('Error submitting product:', err);
    }
  };

  return (
    <>
      {error && <div className="error">{error}</div>} {/* Display error message */}
      <NavBar onOpen={handleOpen} onSearch={setSearchTerm} />
      {loading ? (
        <div className="loading">Loading products...</div> // Show loading state
      ) : (
        <TableList
          tableData={tableData}
          setTableData={setTableData}
          handleOpen={handleOpen}
          searchTerm={searchTerm}
        />
      )}
      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        productData={productData}
        onSubmit={handleSubmit}
      />
    </>
  );
}
