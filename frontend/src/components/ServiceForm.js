import { useState } from "react"

const ServiceForm =() => {
    const [serviceName, setServicename] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const service = { serviceName, description, price}

        const response = await fetch('/services', {
            method: 'POST',
            body: JSON.stringify(service),
            headers: {
                'Content-Type': 'application/json'
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
            />
            <label>Description: </label>
            <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description} 
            />
            <label>Price: </label>
            <input 
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                value={price} 
            />

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ServiceForm;