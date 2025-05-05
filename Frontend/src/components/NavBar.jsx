import PropTypes from 'prop-types';

export default function NavBar({ onOpen, onSearch }) {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar bg-white shadow flex flex-wrap items-center justify-between px-6 py-4 mb-4">
      <h1 className="text-xl font-semibold text-gray-800">Products</h1>

      <div className="flex items-center gap-3 w-full sm:w-auto mt-3 sm:mt-0">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          className="px-3 py-2 border border-gray-300 bg-slate-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        <button
          onClick={() => onOpen('add', null)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition"
        >
          Add
        </button>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};
