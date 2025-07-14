import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddClothing = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("http://localhost:5000/api/clothing", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("Clothing item added successfully!");
        setSuccess(true);
        form.reset();
      } else {
        setMessage(data.message || "Error adding clothing item");
        setSuccess(false);
      }
    } catch (error) {
      setMessage("Error: Could not connect to server");
      setSuccess(false);
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="gradient-bg min-h-screen p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 relative">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-full transition-all duration-200"
            title="Back to Dashboard"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-rose-700 text-center flex-1">Add Clothing</h1>
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
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto relative overflow-hidden animate-fadeIn">
          <div className="absolute top-0 left-0 w-32 h-32 bg-rose-200 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-pink-200 rounded-full translate-x-12 translate-y-12 opacity-50"></div>
          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-rose-700 mb-2">Add New Clothing Item</h2>
            <p className="text-rose-500 text-sm">Upload details for a new clothing item</p>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6 relative z-10">
            {[
              { id: "name", type: "text", placeholder: "Vintage Graphic Tee" },
              { id: "category", type: "select", options: ["Tops", "Bottoms", "Dresses", "Accessories"] },
              { id: "color", type: "text", placeholder: "Black" },
              { id: "price", type: "number", placeholder: "25.00" },
              { id: "sizes", type: "text", placeholder: "S,M,L" },
              { id: "image", type: "file" },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-semibold text-rose-700 mb-2 capitalize">
                  {field.id}
                </label>
                {field.type === "select" ? (
                  <select
                    id={field.id}
                    name={field.id}
                    required
                    className="w-full p-4 pl-4 rounded-xl border-2 border-rose-200 input-focus bg-rose-50 text-rose-700"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    required
                    step={field.type === "number" ? "0.01" : undefined}
                    min={field.type === "number" ? "0" : undefined}
                    placeholder={field.placeholder || ""}
                    className="w-full p-4 pl-4 rounded-xl border-2 border-rose-200 input-focus bg-rose-50 placeholder-rose-400"
                  />
                )}
              </div>
            ))}
            {message && (
              <div className={`bg-${success ? "green" : "red"}-50 border border-${success ? "green" : "red"}-200 rounded-lg p-4 flex items-center`}>
                <svg className={`w-5 h-5 text-${success ? "green" : "red"}-500 mr-2`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className={`text-${success ? "green" : "red"}-700 text-sm`}>{message}</p>
              </div>
            )}
            <button type="submit" className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 btn-hover shadow-lg">
              Add Clothing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClothing;
