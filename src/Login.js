import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Basic validation
        if (!email || !password) {
            setError("Please enter both email and password.");
            setSuccess("");
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Store the token
                setSuccess("Login successful!");
                setError("");
                navigate('/home'); // Redirect to the home page
            } else {
                setError("Invalid email or password.");
                setSuccess("");
            }
        } catch (err) {
            setError("Error connecting to the server. Please try again later.");
            setSuccess("");
        }
    };

    return (
        <div className="container" style={{ marginTop: "10vh", maxWidth: "400px" }}>
            <form onSubmit={handleSubmit}>
                <h2>Login to Your Account</h2>
                <p>Welcome back!</p>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Log In</button>
                <p style={{ marginTop: "10px", textAlign: "center" }}>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
