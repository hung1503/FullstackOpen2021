import React from "react"
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

const User = () => {
    const user = useSelector(state => state.users)
    console.log('User', user)
    return (
        <div>
        {user.map(user => (
            <div key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
                <p>{user.username}</p>
                <p>{user.blogs.length}</p>
            </div>)
        )}
        </div>
    )
}

export default User
    