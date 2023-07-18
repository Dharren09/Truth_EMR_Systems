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
            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default SignupForm;