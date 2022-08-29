import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/dist/client/router'

const LoginPage = () => {

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    
    const router = useRouter();
    
    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials);
        const response = await axios.post("api/auth/login", credentials);
        if (response.status === 200) {
            router.push("/dashboard")
        }
        console.log(response);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='email' type="email" placeholder='email' onChange={handleChange} />
                <input name='password' type="password" placeholder='password' onChange={handleChange} />
                <button>Login</button>

            </form>
        </div>
    )
}

export default LoginPage