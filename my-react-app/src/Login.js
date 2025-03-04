import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    //Stores the username and password as a form to dynamically track as the user inputs data
  const [formData, setFormData] = useState({ username: '', password: '' });

  //Toggle visibility of password
  const [showPassword, setShowPassword] = useState(false);

  //Tracks login state to prevent multiple submissions by the user
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  //Allows redirection after successful login
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("signupUsername");
    if (savedUsername) {
        setFormData((prev) => ({ ...prev, username: savedUsername }));
        localStorage.removeItem("signupUsername"); // Clear after autofill
    }
  }, []);

  //Updates the corresponding field in formData when user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Handles validation checks when the user submits the form
  const handleSubmit = async (e) => {

    //Prevent automatic submission of the form
    e.preventDefault();

    //Removes the whitespaces within the username field to ensure that the field is not empty
    if (formData.username.trim() === "") {
        alert("Username can't be empty.")
        return;
    }

    //Prevents submission if the password is less than 6 characters long
    if (formData.password.length < 6) {
        alert("Password must be more than 6 characters long!")
        return;
    }

    //Sets the state as true to allow successful submission and disabling of the login button to prevent further submissions
    setIsLoggingIn(true);

    //Sends a POST request to the backend to login.
    //The request includes the username and password from the form input.
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.text();

      if (response.ok) {
        alert("Login successful!");
        navigate("/dashboard"); // Redirect after successful login
      } else {
        alert(data); // Show error message from backend
      }
    } catch (error) {
      alert("Login failed! Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {/*Input field for the username*/}
      <input
        type="username"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <br />

      {/*Input field for the password with dynamic visibility*/}
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <br />
      <label>

        {/*Displays checkbox to toggle visibility*/}
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        Show Password
      </label>
      <br />
      {/*Displays submit button which is disabled when logging in*/}
      <button type="submit" disabled={isLoggingIn}>
        {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      <p>

        {/*Link to signup page for new users*/}
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </form>
  );
};

export default Login;
