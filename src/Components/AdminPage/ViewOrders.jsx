import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" }); // type: 'success' | 'error'
  const [loading, setLoading] = useState(true);
  const [statusUpdates, setStatusUpdates] = useState({});

  // Check admin token & redirect if none
  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin-login");
    } else {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show message with timeout
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  // Fetch orders for user
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok) {
        setOrders(data);
      } else {
        showMessage(data.message || "Error fetching orders", "error");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      showMessage("Error: Could not connect to server", "error");
    } finally {
      setLoading(false);
    }
  };

  //update status
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        showMessage("Order status updated successfully", "success");
        setStatusUpdates((prev) => ({ ...prev, [orderId]: undefined }));
      } else {
        showMessage(data.message || "Error updating status", "error");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      showMessage("Error: Could not connect to server", "error");
    }
  };

  // Handle status selection change
  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdates((prev) => ({ ...prev, [orderId]: newStatus }));
  };


  //handle delete
  const handleDelete = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (res.ok) {
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId))
        showMessage("Order deleted successfully", "success");
      } else {
        showMessage(data.message || "Error deleting order", "error");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      showMessage("Error: Could not connect to server", "error");
    }
  }


  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="gradient-bg min-h-screen p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 relative">
          <button
            onClick={() =>
              window.history.length > 1
                ? window.history.back()
                : navigate("/admin-dashboard")
            }
            className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-full transition-all duration-200"
            title="Back to Dashboard"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-rose-700 text-center flex-1">
            View Orders
          </h1>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold btn-hover shadow-lg"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto relative overflow-hidden animate-fadeIn">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-rose-200 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-pink-200 rounded-full translate-x-12 translate-y-12 opacity-50"></div>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-rose-700 mb-2">Manage Orders</h2>
            <p className="text-rose-500 text-sm">View and update customer orders</p>
          </div>

          {/* Message */}
          {message.text && (
            <div
              className={`mt-4 flex items-center p-4 rounded-lg ${message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
                }`}
              role="alert"
            >
              <svg
                className={`w-5 h-5 mr-2 ${message.type === "success" ? "text-green-500" : "text-red-500"
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {message.type === "success" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                )}
              </svg>
              <p className="text-sm">{message.text}</p>
            </div>
          )}

          {/* Orders Table */}
          <div className="relative z-10 overflow-x-auto">
            {loading ? (
              <p className="text-center text-rose-700 py-8">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-center text-rose-700 py-8">No orders found.</p>
            ) : (
              <table className="w-full text-sm text-left text-rose-700">
                <thead className="text-xs text-rose-600 uppercase bg-rose-50">
                  <tr>
                    {/* <th scope="col" className="px-6 py-3">
                      Order ID
                    </th> */}
                    <th scope="col" className="px-6 py-3">
                      Customer Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="table-row-hover transition-all duration-200"
                    >
                      {/* <td className="px-6 py-4">{order._id}</td> */}
                      <td className="px-6 py-4">
                        {order.shippingInfo?.firstName + " " + order.shippingInfo?.lastName || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        Rs.{" "}
                        {order.items
                          ? order.items.reduce((sum, item) => sum + item.totalAmount, 0) : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {order.items[0]?.product?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <select
                          value={statusUpdates[order._id] || order.status || "Pending"}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="border border-rose-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <button
                          onClick={() =>
                            handleUpdateStatus(order._id, statusUpdates[order._id] || order.status || "Pending")
                          }
                          className="bg-rose-500 text-white px-2 py-1 rounded-md text-sm hover:bg-rose-600 flex items-center justify-center"
                          disabled={!statusUpdates[order._id] || statusUpdates[order._id] === order.status}
                          title="Update Status"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>

                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            const confirmDelete = window.confirm("Are you sure you want to delete this order?");
                            if (confirmDelete) {
                              handleDelete(order._id)
                            }
                          }}
                          className="text-red-500 hover:text-red-700"
                          title="Delete Order"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
