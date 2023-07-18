import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

const ServiceForm =() => {
    const { auth_user } = useAuthContext()

    const [serviceName, setServicename] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!auth_user) {
            setError('You must be logged in')
            return
        }

        const service = { serviceName, description, price}

        const response = await fetch('/services', {
            method: 'POST',
            body: JSON.stringify(service),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth_user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setServicename('')
            setDescription('')
            setPrice('')
            setError(null)
            setEmptyFields([])
            console.log('Service Registered', json)
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Register a Service</h3>

            <label>Servicename: </label>
            <input 
                type="text"
                onChange={(e) => setServicename(e.target.value)}
                value={serviceName} 
                className={emptyFields.includes('serviceName') ? 'error' : ''}
            />
            <label>Description: </label>
            <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description} 
                className={emptyFields.includes('description') ? 'error' : ''}
            />
            <label>Price: </label>
            <input 
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                value={price} 
                className={emptyFields.includes('price') ? 'error' : ''}
            />

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ServiceForm;