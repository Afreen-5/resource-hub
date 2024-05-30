import axios from "axios";
import React, { useState } from "react";

const SignupForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        phone: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [event.target.name]: [event.target.value] })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        try {
            event.preventDefault()
            const response = await axios.post('https://jsonplaceholder.typicode.com/users')
            console.log("Form submitted successfully", response.data)
        } catch (error: any) {
            console.log("Failed to submit data", error)
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            <input type="number" name="phone" value={formData.phone} onChange={handleChange} />
        </form>
    )
}

export default SignupForm;