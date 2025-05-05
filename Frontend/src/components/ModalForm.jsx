import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function ModalForm({ isOpen, onClose, mode, onSubmit, productData = null }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && productData) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
      setIsActive(productData.isActive);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setIsActive(false);
    }
  }, [mode, productData]);

  const handle = (e) => {
    e.preventDefault();
    onSubmit({ name, description, price: Number(price), category, isActive });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-slate-900 text-white p-6 rounded-xl w-full max-w-md shadow-2xl">
        <h3 className="text-xl font-semibold text-center mb-4">{mode === 'edit' ? 'Edit' : 'Add'} Product</h3>
        <form onSubmit={handle} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
              required
              className="w-full px-3 py-2 rounded-md bg-blue-100 text-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product description"
              className="w-full px-3 py-2 rounded-md bg-blue-100 text-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              required
              className="w-full px-3 py-2 rounded-md bg-blue-100 text-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              className="w-full px-3 py-2 rounded-md bg-blue-100 text-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={isActive ? 'Active' : 'Inactive'}
              onChange={(e) => setIsActive(e.target.value === 'Active')}
              className="w-full px-3 py-2 rounded-md bg-blue-100 text-black focus:outline-none"
            >
              <option value="Inactive">Inactive</option>
              <option value="Active">Active</option>
            </select>
          </div>

          <div className="flex justify-between pt-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              {mode === 'edit' ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

ModalForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  productData: PropTypes.object,
};
