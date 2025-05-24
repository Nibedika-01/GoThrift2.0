import React, { useState } from 'react';

export default function AdminAddItem() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      alert("Item added successfully!");
      setName("");
    } else {
      alert("Failed to add item");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Item</h2>
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
