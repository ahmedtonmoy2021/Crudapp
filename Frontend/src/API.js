import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const getProducts = (token) => {
  return axios.get(`${API_URL}/products`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const createProduct = (token, product) => {
  return axios.post(`${API_URL}/products`, product, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const updateProduct = (token, productId, updatedProduct) => {
  return axios.put(`${API_URL}/products/${productId}`, updatedProduct, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const deleteProduct = (token, productId) => {
  return axios.delete(`${API_URL}/products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export { getProducts, createProduct, updateProduct, deleteProduct };
