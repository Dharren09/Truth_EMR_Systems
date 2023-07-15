const UserDetails = ({ user }) => {
    return(
        <div className="user-details">
            <h4>{user.name}</h4>
            <p><strong>Username: </strong>{user.username}</p>
            <p><strong>Email: </strong>{user.email}</p>
            <p><strong>Role: </strong>{user.role}</p>
            <p><strong>Gender: </strong>{user.gender}</p>
        </div>
    )
}

export default UserDetails;