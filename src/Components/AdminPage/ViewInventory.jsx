import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewInventory = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [editMode, setEditMode] = useState({});
  const [editedProduct, setEditedProduct] = useState({});

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin-login");
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/clothing");
      const data = await res.json();
      if (res.ok) setProducts(data);
      else showMessage(data.message || "Failed to load products", "error");
    } catch (error) {
      showMessage("Server error while fetching products", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/clothing/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
        showMessage("Product deleted", "success");
      } else {
        showMessage(data.message, "error");
      }
    } catch (error) {
      showMessage("Error deleting product", "error");
    }
  };

  const handleMarkSold = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/clothing/${id}/sold`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setProducts((prev) => prev.map((p) => (p._id === id ? { ...p, sold: true } : p)));
        showMessage("Product marked as sold", "success");
      } else showMessage(data.message, "error");
    } catch {
      showMessage("Error marking as sold", "error");
    }
  };

  const toggleEdit = (id, product = {}) => {
    setEditMode((prev) => ({ ...prev, [id]: !prev[id] }));
    setEditedProduct(product);
  };

  const handleEditChange = (field, value) => {
    setEditedProduct((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/clothing/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });
      const data = await res.json();
      if (res.ok) {
        setProducts((prev) => prev.map((p) => (p._id === id ? data : p)));
        toggleEdit(id);
        showMessage("Product updated", "success");
      } else showMessage(data.message, "error");
    } catch {
      showMessage("Update failed", "error");
    }
  };

  return (
    <div className="gradient-bg min-h-screen p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-full transition-all duration-200 mb-4 sm:mb-0"
            title="Back to Dashboard"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-rose-700 text-center flex-1">
            Inventory
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              navigate("/admin-login");
            }}
            className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold btn-hover shadow-lg"
          >
            Logout
          </button>
        </div>

        {message.text && (
          <div
            className={`p-3 rounded-md mb-4 ${
              message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-full mx-auto relative overflow-hidden animate-fadeIn">
          <div className="absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-rose-200 rounded-full -translate-x-12 sm:-translate-x-16 -translate-y-12 sm:-translate-y-16 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-pink-200 rounded-full translate-x-10 sm:translate-x-12 translate-y-10 sm:translate-y-12 opacity-50"></div>
          {loading ? (
            <p className="text-center text-rose-700">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-rose-700">No products found.</p>
          ) : (
            <div className="relative z-10">
              {/* Table for larger screens */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-left text-rose-700">
                  <thead className="text-xs uppercase bg-rose-50 text-rose-600">
                    <tr>
                      <th className="px-4 py-2">Image</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Size</th>
                      <th className="px-4 py-2">Category</th>
                      <th className="px-4 py-2">Sold</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((prod) => (
                      <tr key={prod._id} className="hover:bg-rose-50">
                        <td className="px-4 py-2">
                          <img
                            src={`http://localhost:5000${prod.image}`}
                            alt={prod.name}
                            className="h-12 w-12 object-cover rounded-md"
                          />
                        </td>
                        <td className="px-4 py-2">
                          {editMode[prod._id] ? (
                            <input
                              value={editedProduct.name || ""}
                              onChange={(e) => handleEditChange("name", e.target.value)}
                              className="w-full border px-2 py-1 rounded text-sm"
                            />
                          ) : (
                            prod.name
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editMode[prod._id] ? (
                            <input
                              type="number"
                              value={editedProduct.price || ""}
                              onChange={(e) => handleEditChange("price", e.target.value)}
                              className="w-full border px-2 py-1 rounded text-sm"
                            />
                          ) : (
                            `Rs. ${prod.price}`
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editMode[prod._id] ? (
                            <input
                              value={editedProduct.sizes || ""}
                              onChange={(e) => handleEditChange("sizes", e.target.value)}
                              className="w-full border px-2 py-1 rounded text-sm"
                            />
                          ) : (
                            `${prod.sizes}`
                          )}
                        </td>
                        <td className="px-4 py-2">{prod.category}</td>
                        <td className="px-4 py-2">
                          {prod.sold ? (
                            <span className="text-green-600 font-semibold">Yes</span>
                          ) : (
                            <button
                              onClick={() => handleMarkSold(prod._id)}
                              className="text-sm px-2 py-1 bg-yellow-400 hover:bg-yellow-500 rounded text-white"
                            >
                              Mark as Sold
                            </button>
                          )}
                        </td>
                        <td className="px-4 py-2 space-x-2">
                          {editMode[prod._id] ? (
                            <button
                              onClick={() => saveEdit(prod._id)}
                              className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => toggleEdit(prod._id, prod)}
                              className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(prod._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card layout for mobile screens */}
              <div className="md:hidden space-y-4">
                {products.map((prod) => (
                  <div
                    key={prod._id}
                    className="bg-rose-50 rounded-lg p-4 shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                      <img
                        src={`http://localhost:5000${prod.image}`}
                        alt={prod.name}
                        className="h-16 w-16 object-cover rounded-md mb-2 sm:mb-0"
                      />
                      <div className="flex-1">
                        <div className="mb-2">
                          <span className="font-semibold">Name: </span>
                          {editMode[prod._id] ? (
                            <input
                              value={editedProduct.name || ""}
                              onChange={(e) => handleEditChange("name", e.target.value)}
                              className="w-full border px-2 py-1 rounded text-sm"
                            />
                          ) : (
                            prod.name
                          )}
                        </div>
                        <div className="mb-2">
                          <span className="font-semibold">Price: </span>
                          {editMode[prod._id] ? (
                            <input
                              type="number"
                              value={editedProduct.price || ""}
                              onChange={(e) => handleEditChange("price", e.target.value)}
                              className="w-full border px-2 py-1 rounded text-sm"
                            />
                          ) : (
                            `Rs. ${prod.price}`
                          )}
                        </div>
                        <div className="mb-2">
                          <span className="font-semibold">Size: </span>
                          {editMode[prod._id] ? (
                            <input
                              value={editedProduct.sizes || ""}
                              onChange={(e) => handleEditChange("sizes", e.target.value)}
                              className="w-full border px-2 py-1 rounded text-sm"
                            />
                          ) : (
                            `${prod.sizes}`
                          )}
                        </div>
                        <div className="mb-2">
                          <span className="font-semibold">Category: </span>
                          {prod.category}
                        </div>
                        <div className="mb-2">
                          <span className="font-semibold">Sold: </span>
                          {prod.sold ? (
                            <span className="text-green-600 font-semibold">Yes</span>
                          ) : (
                            <button
                              onClick={() => handleMarkSold(prod._id)}
                              className="text-sm px-2 py-1 bg-yellow-400 hover:bg-yellow-500 rounded text-white"
                            >
                              Mark as Sold
                            </button>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          {editMode[prod._id] ? (
                            <button
                              onClick={() => saveEdit(prod._id)}
                              className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => toggleEdit(prod._id, prod)}
                              className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(prod._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewInventory;