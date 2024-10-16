import React, { useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({ name: '', email: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(data)
      setIsLoading(false)
    } catch (error) {
      setError('Failed to fetch users')
      setIsLoading(false)
      console.error('There was a problem with the fetch operation:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      if (!response.ok) {
        throw new Error('Failed to add user')
      }
      setNewUser({ name: '', email: '' })
      fetchUsers() // Refresh the user list
    } catch (error) {
      setError('Failed to add user')
      console.error('There was a problem adding the user:', error)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container">
      <h1>User Management</h1>
      
      <div className="add-user-form">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
          </div>
          <button type="submit">Add User</button>
        </form>
      </div>

      <div className="user-list">
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
