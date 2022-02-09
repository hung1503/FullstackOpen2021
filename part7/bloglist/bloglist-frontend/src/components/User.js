import React from "react"
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const User = () => {
    const user = useSelector(state => state.users)
    console.log('User', user)

    const text = {
        textDecoration: 'none',
        fontStyle: 'italic',
        fontSize: '1.5em'
    
      }
    return (
        <div className="container">
        <h2>Users</h2>
            <Table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map(user => (
                        <tr key={user.id}>
                            <td>
                                <Link style={text} to={`/users/${user.id}`}>{user.name}</Link>
                                </td>
                            <td>
                                {user.blogs.length}
                            </td>
                        </tr>)
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default User
    