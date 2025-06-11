import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthProvider";

// Container to center the form on screen
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f2f4f8;
`;

const SignupForm = styled.form`
  background: #ffffff;
  padding: 3rem 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Heading = styled.h2`
  margin: 0;
  font-size: 1.8rem;
  color: #333;
  background: transparent;
  text-align: center;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: 0.2s ease;
  &:focus {
    border-color: #3f51b5;
    outline: none;
    box-shadow: 0 0 0 2px #3f51b533;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background-color: #3f51b5;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    background-color: #2c3e90;
  }
`;

const Login = styled.p`
  color: #333;
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
  background-color: transparent;

  a {
    background-color: transparent;
    color: #2c3e90;
    text-decoration: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
`;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const baseRole = "user";
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          email,
          pass,
          role: baseRole,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle 400/409 errors from backend
        setError(data.message || "Signup failed");
        return;
      }

      // Success case: Store token & user data
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userId", data.user.id);

      // Update auth context & redirect
      login({ username: data.user.name, role: data.user.role });
      navigate(data.user.role === "admin" ? "/admin/dashboard" : "/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      setError("Network error. Please try again.");
    }
  };

  return (
    <Container>
      <SignupForm onSubmit={handleSubmit}>
        <Heading>Signup</Heading>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <Button type="submit">Signup</Button>
        <Login>
          Don't have an account? <Link to="/login">Login</Link>
        </Login>
      </SignupForm>
    </Container>
  );
};

export default Signup;
