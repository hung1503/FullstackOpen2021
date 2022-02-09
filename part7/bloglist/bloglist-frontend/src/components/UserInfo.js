import React from "react";

const UserInfo = ({userInfo}) => {
    console.log('UserInfo', userInfo)
    if(!userInfo) {
        return <p>No info</p>
    }
    return (
        <div>
            <div>
                <h1>{userInfo.name}</h1>
                {userInfo.blogs.length === 0 ? <p>No blogs added</p> : <p>{userInfo.blogs.length} blogs added</p>}
                {userInfo.blogs.map(blog=>(<div key={blog.id}>{blog.title}</div>))}
            </div>
        </div>
    )
}

export default UserInfo