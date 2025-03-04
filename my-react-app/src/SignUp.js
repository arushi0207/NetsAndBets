import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

  //Stores the username, password and confirm password as a form to dynamically track as the user inputs data
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });

  //Track password strength to provide the user with feedback on security
  const [passwordStrength, setPasswordStrength] = useState('');

  //Ensures that the password and confirmation match
  const [passwordMatch, setPasswordMatch] = useState(true);

  //Toggle visibility of password
  const [showPassword, setShowPassword] = useState(false);

  //Tracks signup state to prevent multiple submissions by the user
  const [isSigningUp, setIsSigningUp] = useState(false);

  //Allows redirection after successful signup
  const navigate = useNavigate();

  //Handles changes to the form data by updating appropriate states defined above
  const handleChange = (e) => {
    const { name, value } = e.target;

    //Ensures that the password and confirmation match as user types in the confirmation
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      if (name === "password" || name === "confirmPassword") {
        setPasswordMatch(updatedFormData.password === updatedFormData.confirmPassword);
      }

      return updatedFormData;
    });

    //Evaluates the password as user types in the password
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }


  };

  //Determines password strength and assigns keywords and colors accordingly
  const checkPasswordStrength = (password) => {
    if (password.length < 6) return { text: "Weak", color: "red" };
    if (password.length < 10) return { text: "Medium", color: "orange" };
    return { text: "Strong", color: "green" };
  };

  //Handles validation checks when the user submits the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Removes the whitespaces within the username field to ensure that the field is not empty
    if (formData.username.trim() === "") {
      alert("Username can't be empty! Please enter a username :}")
      return;
    }

    //Prevents submission if the passwords do not match
    if (!passwordMatch) {
      alert("Your passwords do not match! Please check again :)");
      return;
    }

    //Prevents submission if the password strength is too weak
    if (passwordStrength.text === "Weak") {
      alert("Your password is too weak! Try making it stronger.");
      return;
    }

    //Sets the state as true to allow successful submission and disabling of the signup button to prevent further submissions
    setIsSigningUp(true);

    //Sends a POST request to the backend to register a new user.
    //The request includes the username and password from the form input.
    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      //Waiting for a response from the backend
      const data = await response.text();
      console.log("Response from backend:", data);

      //Alerting the user with the message received from backend
      alert(data);

      if (response.ok) {

        // Store username in local storage
        localStorage.setItem("signupUsername", formData.username);
        
        // Redirect to login page
        navigate("/login");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Signup failed! Please try again.");
    } finally {
      setIsSigningUp(false);
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

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

      {/*Display password strength*/}
      <p style={{ color: passwordStrength.color }}>
        Password Strength: {passwordStrength.text}
      </p>

      {/*Input field for confirm password with dynamic visibility*/}
      <input
        type={showPassword ? "text" : "password"}
        name="confirmPassword"
        placeholder="Retype your password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <br />

      {/*Displays whenther the passwords match*/}
      {formData.confirmPassword && (
        <p style={{ color: passwordMatch ? "green" : "red" }}>
          {passwordMatch ? "Passwords match ✅" : "Passwords do not match ❌"}
        </p>
      )}
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

      {/*Displays submit button which is disabled when signing up*/}
      <button type="submit" disabled={isSigningUp}>
        {isSigningUp ? "Signing in..." : "Signup"}
      </button>
      <p>

        {/*Link to login page for existing users*/}
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Signup;
