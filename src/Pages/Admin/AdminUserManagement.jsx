import { useState, useEffect } from "react"
import AdminNavbar from "./AdminNavbar"

const AdminUserManagement = () => {

    const[users, setUsers] = useState([]);

    useEffect( () => {
        //for now mock users, later use API fetch
        const mockUsers = [
            {id: 1, name: Nibedika, email: 'nibedika@gmail.com'},
            {id: 2, name: Kripa, email: 'kripa@gmail.com'},
            {id: 3, name: Prajeena, email: 'prajeena@gmail.com'}
        ];
        setUsers(mockUsers)
    }, []);

  return (
     <div>
      <AdminNavbar />
      <h1>User Management</h1>
      <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%', maxWidth: 600 }}>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td><td>{user.name}</td><td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminUserManagement
