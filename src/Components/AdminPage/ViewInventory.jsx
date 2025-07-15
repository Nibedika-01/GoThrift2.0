import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewInventory = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState({});
    const [editedProduct, setEditedProduct] = useState([]);

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ test: "", type: "" }), 3000);
    };

    useEffect(() => {
        if (!localStorage.getItem('adminToken')) {
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

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            const res = await fetch(`http://localhost:/api/clothing/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (res.ok) {
                setProducts(products.filter((p) => p._id !== id));
                showMessage("Product deleted successfully", "success");
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
            });

            const data = await res.json();
            if (res.ok) {
                setProducts((prev) =>
                    prev.map((p) => (p._id === id ? { ...p, sold: true } : p))
                );
                showMessage("Product marked as sold", "success");
            } else {
                showMessage(data.message, "error");
            }
        } catch (error) {
            showMessage("Error marking as sold", "error");
        }
    };

    const toggleEdit = (id, product = {}) => {
        setEditMode((prev) => ({ ...prev, [id]: !prev[id] }));
        setEditedProduct(product);
    };

    const saveEdit = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/clothing/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
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
        <div className="gradient-bg min-h-screen p-6 font-sans object-contain">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-rose-700">Inventory</h1>
                    <button
                        onClick={() => {
                            localStorage.removeItem("adminToken");
                            navigate("/admin-login");
                        }}
                        className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-xl"
                    >
                        Logout
                    </button>
                </div>

                {message.text && (
                    <div
                        className={`p-3 rounded-md mb-4 ${message.type === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                {loading ? (
                    <p className="text-center text-rose-600">Loading...</p>
                ) : products.length === 0 ? (
                    <p className="text-center text-rose-600">No products found.</p>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-3xl shadow-xl p-6">
                        <table className="w-full text-sm text-left text-rose-700">
                            <thead className="text-xs uppercase bg-rose-50 text-rose-600">
                                <tr>
                                    <th className="px-4 py-2">Image</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Price</th>
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
                                                    value={editedProduct.name}
                                                    onChange={(e) => handleEditChange("name", e.target.value)}
                                                    className="border px-2 py-1 rounded"
                                                />
                                            ) : (
                                                prod.name
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {editMode[prod._id] ? (
                                                <input
                                                    type="number"
                                                    value={editedProduct.price}
                                                    onChange={(e) => handleEditChange("price", e.target.value)}
                                                    className="border px-2 py-1 rounded"
                                                />
                                            ) : (
                                                `Rs. ${prod.price}`
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
                                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => toggleEdit(prod._id, prod)}
                                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(prod._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewInventory;

