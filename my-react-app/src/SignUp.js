import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {CircleDollarSign as Money} from 'lucide-react';
import { AuthContext } from './Context/AuthContext';

const Signup = () => {

  //Stores the user form data
  const [formData, setFormData] = useState({ 
    name: '',
    username: '', 
    password: '', 
    confirmPassword: '',
    amount: 1000 // Default starting amount
  });

  //Track password strength to provide the user with feedback on security
  const [passwordStrength, setPasswordStrength] = useState('');

  //Ensures that the password and confirmation match
  const [passwordMatch, setPasswordMatch] = useState(true);

  //Toggle visibility of password
  const [showPassword, setShowPassword] = useState(false);

  //Track if signup is in progress
  const [isSigningUp, setIsSigningUp] = useState(false);

  //Allows redirection after successful signup
  const navigate = useNavigate();

  //Handles changes to the form data by updating appropriate states defined above
  const handleChange = (e) => {
    const { name, value } = e.target;

    //Ensures that the password and confirmation match as user types in the confirmation
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      // Only check password match when typing in confirmPassword field
      if (name === "confirmPassword") {
        setPasswordMatch(updatedFormData.password === updatedFormData.confirmPassword);
      }

      return updatedFormData;
    });

    //Checks password strength when user types in the password field
    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  //Determines password strength and assigns keywords and colors accordingly
  const checkPasswordStrength = (password) => {
    // Default strength is set to "Weak" with red color
    let strength = {
      text: "Weak",
      color: "red"
    };
  
    // Password should be at least 8 characters long
    const lengthCriteria = password.length >= 8;

    // Password should have at least one uppercase letter
    const uppercaseCriteria = /[A-Z]/.test(password);

    // Password should contain at least one lowercase letter
    const lowercaseCriteria = /[a-z]/.test(password);

    // Password should contain at least one numeric digit
    const numberCriteria = /[0-9]/.test(password);

    // Password should contain at least one special character
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    // Count the number of criteria that the password passes
    const passedCriteria = [lengthCriteria, uppercaseCriteria, lowercaseCriteria, numberCriteria, specialCharCriteria].filter(Boolean).length;
  
    // Determine password strength based on the number of criteria met
    if (passedCriteria >= 4) {
      strength = { text: "Strong", color: "green" };
    } else if (passedCriteria >= 3) {
      strength = { text: "Medium", color: "orange" };
    }
  
    // Return the password strength
    return strength;
  };

  const { login } = useContext(AuthContext);

  //Handles validation checks when the user submits the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validate form data
    if (formData.name.trim() === "") {
      alert("Name can't be empty! Please enter your name.");
      return;
    }

    if (formData.username.trim() === "") {
      alert("Username can't be empty! Please enter a username.");
      return;
    }

    //Prevents submission if the passwords do not match
    if (!passwordMatch) {
      alert("Your passwords do not match! Please check again.");
      return;
    }

    //Prevents submission if the password strength is too weak
    if (passwordStrength.text === "Weak") {
      alert("Your password is too weak! Try making it stronger.");
      return;
    }

    //Sets the state as true to allow successful submission and disabling of the signup button to prevent further submissions
    setIsSigningUp(true);

    try {
      // Send request to create user endpoint
      const response = await fetch("http://localhost:8080/demo/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          password: formData.password,
          amount: formData.amount
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Auto-login the user after successful registration
        login({
          username: formData.username,
          name: formData.name,
          amount: formData.amount
        });

        alert("Account created successfully!");
        
        // Store username in local storage for auto-fill on login page
        localStorage.setItem("signupUsername", formData.username);
        
        navigate("/");
      } else {
        alert(data.message || "Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Signup failed! Please try again.");
    } finally {
      setIsSigningUp(false);
    }
  };

  // Return UI
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
        {/* Styling for the Container */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Website title */}
          <div style={{ margin: '0', padding: '0', display: 'flex', justifyContent: 'center', marginTop: '-5px' }}>
            <p style={{ 
              background: 'linear-gradient(to right, #FF8C00, #FFA500, #FFD700)',
              fontFamily: "Impact, Arial Black, sans-serif", 
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
              Nets and Bets
            </p>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p style={{ color: 'white', fontFamily: "Arial", margin: "0", padding: "0" }}>
              Sign up to join the madness!
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ marginTop: '26px', marginRight:"20px", width: '100%' }}>
            {/* Name field - NEW */}
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="name" style={{ color: 'white', fontWeight: '700', fontFamily: "Arial", marginBottom: '6px', display: 'block' }}>
                Full Name
              </label>
              <input
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
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
              <label htmlFor="username" style={{ color: 'white', fontWeight: '700', fontFamily: "Arial", marginBottom: '6px', display: 'block' }}>
                Username
              </label>
              <input
                id="username"
                name="username"
                placeholder="Enter your username.."
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
                  placeholder="Enter your password.."
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
              {passwordStrength && (
                <p style={{ 
                  fontSize: '16px', 
                  fontFamily: "Arial",
                  marginTop: '6px',
                  color: passwordStrength.color === 'green' ? '#10B981' : 
                         passwordStrength.color === 'orange' ? '#F59E0B' : '#EF4444'
                }}>
                  Password strength: {passwordStrength.text}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="confirmPassword" style={{ color: 'white', fontWeight: '600', fontFamily: "Arial", marginBottom: '6px', display: 'block', }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{
                    backgroundColor: 'rgba(22, 28, 39, 0.8)',
                    fontFamily: "Arial",
                    color: 'white',
                    padding: '12px',
                    borderRadius: '8px',
                    width: '100%',
                    border: '1px solid rgb(211, 87, 9)',
                  }}
                />
              </div>
              {formData.confirmPassword && !passwordMatch && (
                <p style={{ color: 'red', fontFamily: "Arial", fontSize: '16px', marginTop: '6px' }}>Passwords do not match</p>
              )}
            </div>

            {/* Initial amount */}
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="amount" style={{ color: 'white', fontWeight: '700', fontFamily: "Arial", marginBottom: '6px', display: 'block' }}>
                Initial Balance ($)
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                placeholder="Starting balance"
                value={formData.amount}
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
              disabled={isSigningUp}
            >
              {isSigningUp ? 'Signing Up!!' : 'Sign Up'}
            </button>
          </form>

          <div style={{ textAlign: 'center', width: '100%', marginTop: '20px', }}>
            <p style={{ color: 'white', fontFamily: "Arial" }}>
              <span style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '10px' }}>
                <Money style={{color: "green", height: "30px", width: "50px"}}/>
                <Money style={{color: "green", height: "30px", width: "50px"}} />
                <Money style={{color: "green", height: "30px", width: "50px"}} />
                <Money style={{color: "green", height: "30px", width: "50px"}} />
              </span>
              Already have an account?{" "}
              <Link to="/login" style={{ color: '#FF5F1F', fontWeight: '600', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                Log in
              </Link>
            </p>
            <p style={{ color: 'white', fontFamily: "Arial", marginTop: "2px" }}>
               Go back?{" "}
              <Link to="/" style={{ color: '#FF5F1F', fontWeight: '600', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;