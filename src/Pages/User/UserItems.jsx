import React, { useEffect, useState } from 'react';

export default function UserItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Items List</h2>
      {items.map((item) => (
        <div key={item._id}>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}
