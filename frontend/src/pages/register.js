import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
const apiUrl = "https://personalfoodtracker.onrender.com/";

const Register = ({ setUsername }) => {
    const [inputUsername, setInputUsername] = useState("");
    const [storedUsername, setStoredUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${apiUrl}api/returnUser?userId=${inputUsername}`)
        .then((response) => {
            if (response.data && response.data.username) {
                setStoredUsername(response.data.username);
            } else {
                setStoredUsername(null);
            }
        })
        .catch((err) => {
            console.error("Error fetching username:", err);
        });
    }, [inputUsername]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (inputUsername === "") {
            setMessage("Username cannot be empty");
            return;
        }
        else if (storedUsername) {
            setMessage("That username is already taken");
            return;
        }
        else if (inputPassword === "") {
            setMessage("Password cannot be empty");
            return;
        }
        else if (inputPassword === confirmPassword) {
            const newUser = {
                userId: inputUsername, 
                password: inputPassword,
                dailyGoal: null
            };

            console.log("Registering user:", newUser);

            try {

                const response = await axios.post(`${apiUrl}api/setUser`, newUser);
                console.log("Server response:", response.data);

                setUsername(inputUsername);
                setInputUsername("");
                setInputPassword("");
                setConfirmPassword("");

                navigate("/dashboard");
            } catch (err) {
                console.error("Error registering user:", err);
            }
        } else {
            setMessage("Passwords do not match");
        }
    };

    return (
        <div className="register">
        <h2>Register New User</h2>
        <form onSubmit={handleSubmit}>
        <label>
          Username: 
            <input type="text"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
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
        <label>
          Confirm Password: 
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <Link to="/login">Already have an account? Log In.</Link>
        <br />
        <button type="submit">Register</button>
      </form>
      <form>
      {message && <p>{message}</p>}
      </form>

        </div>
    )
};

export default Register;
