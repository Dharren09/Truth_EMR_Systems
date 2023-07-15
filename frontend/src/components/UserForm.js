import { useState } from "react"

const UserForm =() => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [dob, setDob] = useState('')
    const [role, setRole] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {name, username, email, password, gender, contact, address, dob, role}

        const response = await fetch('/user/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setName('')
            setUsername('')
            setEmail('')
            setPassword('')
            setGender('')
            setContact('')
            setAddress('')
            setDob('')
            setRole('')
            setError(null)
            console.log('User Registered', json)
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Register</h3>

            <label>Name: </label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name} 
            />
            <label>Username: </label>
            <input 
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username} 
            />
            <label>Email: </label>
            <input 
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email} 
            />
            <label>Password: </label>
            <input 
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={password} 
            />
            <label>Gender: </label>
            <input 
                type="text"
                onChange={(e) => setGender(e.target.value)}
                value={gender} 
            />
            <label>Contact: </label>
            <input 
                type="number"
                onChange={(e) => setContact(e.target.value)}
                value={contact} 
            />
            <label>Address: </label>
            <input 
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address} 
            />
            <label>DOB: </label>
            <input 
                type="date"
                onChange={(e) => setDob(e.target.value)}
                value={dob} 
            />
            <label>Role: </label>
            <input 
                type="text"
                onChange={(e) => setRole(e.target.value)}
                value={role} 
            />
            <button>Register</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default UserForm;