import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {CircleDollarSign as Money} from 'lucide-react';

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
    <div 
      style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
      }}
    >
      {/* Signup card */}
      <div 
        style={{
          backgroundColor: '#808080CC', 
          borderRadius: '18px',
          boxShadow: '0 28px 52px -10px rgba(0, 0, 0, 0.9)',
          padding: '35px',
          width: '100%',
          maxWidth: '500px',
          border: '2px solid #9CA3AF',
          zIndex: 10
        }}
      >
        <div style={{ margin: '0', padding: '0', display: 'flex', justifyContent: 'center', marginTop: '-5px' }}>
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

          <form onSubmit={handleSubmit} style={{ marginTop: '26px', marginRight:"20px", width: '100%' }}>
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="username" style={{ color: 'white', fontWeight: '700', fontFamily: "Arial", marginBottom: '6px', display: 'block' }}>
                Username
              </label>
              <input
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: 'rgba(22, 28, 39, 0.8)',
                  fontFamily: "Arial",
                  color: 'white',
                  padding: '12px',
                  borderRadius: '10px',
                  width: '100%',
                  border: '1px solid rgb(211, 87, 9)',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="password" style={{ color: 'white', fontWeight: '700', fontFamily: "Arial", marginBottom: '6px', display: 'block' }}>
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
                  style={{
                    backgroundColor: 'rgba(22, 28, 39, 0.8)',
                    fontFamily: "Arial",
                    color: 'white',
                    padding: '12px',
                    borderRadius: '10px',
                    width: '100%',
                    border: '1px solid rgb(211, 87, 9)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    left: '95%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9CA3AF',
                    background: 'none',
                    border: 'none',
                    fontSize: '14px'
                  }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/*Displays submit button which is disabled when logging in*/}
            <button 
              type="submit" 
              style={{
                width: '105%',
                backgroundColor: '#FF5F1F',
                color: 'white',
                padding: '10px',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '18px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(1, 1, 1, 0.1)',
                marginTop: '16px'
              }}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Logging In!!' : 'Log In'}
            </button>
        </form>

        <div style={{ textAlign: 'center', width: '100%', marginTop: '20px', }}>
          <p style={{ color: 'white', fontFamily: "Arial" }}>
            <span style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '7px' }}>
              <Money style={{color: "green", height: "30px", width: "50px"}}/>
              <Money style={{color: "green", height: "30px", width: "50px"}} />
              <Money style={{color: "green", height: "30px", width: "50px"}} />
              <Money style={{color: "green", height: "30px", width: "50px"}} />
            </span>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: '#FF5F1F', fontWeight: '600', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};



export default Login;
