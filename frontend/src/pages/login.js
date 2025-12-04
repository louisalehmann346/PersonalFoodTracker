import React, { useState, useEffect } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [storedPassword, setStoredPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch(`http://localhost:4000/api/returnUser?userId=${username}`)
        .then((res) => res.json())
        .then((data) => {
            if (data && data.password) {
                setStoredPassword(data.password);
            } else {
                setStoredPassword(null);
            }
        })
        .catch((err) => console.error("Error fetching password:", err));
    }, [username]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!storedPassword) {
            setMessage("Username does not exist");
            return;
        }
        if (inputPassword === storedPassword) {
            setMessage("Login successful");
        } else {
            setMessage("Incorrect password");
        }
    };

    return (
        <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
        <label>
          Username: 
            <input type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password: 
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
      {message && <p>{message}</p>}
        </div>
    )
};

export default Login;