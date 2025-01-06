import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate(); // Use navigate for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!email.includes('@')) {
            setError("Please enter a valid email.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        if (username.trim() === "") {
            setError("Username cannot be empty.");
            return;
        }

        const userData = { username, email, password };

        try {
            // POST request to the correct registration endpoint
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            
            if (response.ok) {
                setEmail("");
                setPassword("");
                setUsername("");
                setError("");
                setSuccess("Registration successful! Redirecting to login...");
                setTimeout(() => {
                    navigate('/login'); // Redirect after a short delay
                }, 2000);
            } else {
                // If registration fails, set the error
                const responseData = await response.json(); // Check response for detailed error
                setError(responseData.error || "Registration failed. Please try again.");
            }
        } catch (error) {
            setError("Error connecting to the server.");
        }
    };

    return (
        <div className="container" style={{ marginTop: "10vh" }}>
            <form onSubmit={handleSubmit}>
                <h2>Create your account</h2>
                <p>Welcome</p>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address:</label>
                    <input
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                    />
                </div>
                
                <button type="submit" className="btn btn-primary">REGISTER</button>
                <p style={{ marginTop: "2vh" }}>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
}

export default Register;
