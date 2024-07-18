import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with", email, password);
    }

    return (
        <div className="container" style={{ marginTop: "10vh" }}>
            <form onSubmit={handleSubmit}>
                <h2>Login to your account</h2>
                <p>Welcome back!</p>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address :</label>
                    <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password :</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">LOG IN</button>
                <p style={{ marginTop: "2vh" }}>Don't have an account? <a href="/register">Register</a></p>
            </form>
        </div>
    );
}

export default Login;
