import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminNavbar() {
  return (
    <nav style={{ padding: '10px', background: '#f3f4f6', marginBottom: '20px' }}>
      <Link to="/admin" style={{ marginRight: '15px' }}>Dashboard</Link>
      <Link to="/admin/users" style={{ marginRight: '15px' }}>Users</Link>
      <Link to="/admin/add-item">Add Item</Link>
    </nav>
  );
}
