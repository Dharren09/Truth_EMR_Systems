import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const SignupForm =() => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [dob, setDob] = useState('')
    const [role, setRole] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(name, username, email, password, gender, contact, address, dob, role)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

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
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password} 
            />
            <label>Gender: </label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
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
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="provider">Admin</option>
                <option value="patient">User</option>
            </select>
            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default SignupForm;