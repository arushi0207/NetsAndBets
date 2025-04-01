import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {CircleDollarSign as Money} from 'lucide-react';
import { AuthContext } from './Context/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);

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
      // First, check if the user exists and get their information
      const userResponse = await fetch(`http://localhost:8080/demo/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: formData.username, password: formData.password })
      });
      
      if (!userResponse.ok) {
        throw new Error(await userResponse.text());
      }
      
      const userData = await userResponse.json();
      
      // Login successful
      alert("Login successful!");
      
      // Call login function from context to update app-wide state
      login(userData);
      
      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed! Please try again.");
      setIsLoggingIn(false);
    }
  };

  return (
    <div className= "login-background">
      {/* Login card */}
      <div className='login-card'>
        <div className='login-header'>
            <p style={{ 
              background: 'linear-gradient(to right, #FF8C00, #FFA500, #FFD700)',
              fontFamily: "Impact, Arial Black, sans-serif", 
              fontWeight: 'bold',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '38px', 
              margin: "0", 
              padding: "0",
              letterSpacing: '2px',
              textShadow: '4px 4px 6px rgba(0, 0, 0, 0.2)',
              textTransform: 'uppercase', 
              display: 'inline-block'
            }}>
              Login
            </p>
          </div>

          <form onSubmit={handleSubmit} className='login-form'>
            <div className='login-form-group'>
              <label htmlFor="username" className='login-label'>
                Username
              </label>
              <input
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                className='login-input'
              />
            </div>

            <div className='login-form-group'>
              <label htmlFor="password" className='login-label'>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className='login-input'
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className='password-toggle-btn'
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/*Displays submit button which is disabled when logging in*/}
            <button 
              type="submit" 
              className='login-submit-btn'
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Logging In!!' : 'Log In'}
            </button>
        </form>

        <div className='login-footer'>
          <p className='login-footer-text'>
            <span className='money-icons'>
              <Money className='icon'/>
              <Money className='icon'/>
              <Money className='icon'/>
              <Money className='icon'/>
            </span>
            Don't have an account?{" "}
            <Link to="/signup" className='login-footer-link'>
              Sign up
            </Link>
          </p>
          <p className='login-footer-text'>
            Go back?{" "}
            <Link to="/" className='login-footer-link'>
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};


export default Login;
