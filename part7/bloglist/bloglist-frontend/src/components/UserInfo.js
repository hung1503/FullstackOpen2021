import React from "react";

const UserInfo = ({userInfo}) => {
    console.log('UserInfo', userInfo)
    if(!userInfo) {
        return <p>No info</p>
    }
    return (
        <div>
            <div className="container">
                <h1>{userInfo.name}</h1>
                <ul>
                    <li>{userInfo.blogs.length === 0 ? <p>No blogs added</p> : <p>{userInfo.blogs.length} blogs added</p>}</li>
                    <li>Blogs:{userInfo.blogs.map(blog=>(<ul key={blog.id}><li>{blog.title}</li></ul>))}</li>
                </ul>
            </div>
        </div>
    )
}

export default UserInfo