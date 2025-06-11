import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

// Container to center the form on screen
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 87vh;
  background: #f2f4f8;
`;

const LoginForm = styled.form`
  background: #ffffff;
  padding: 1rem 2rem 2rem 2rem;
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
  background: transparent;
  color: #333;
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

const SignUp = styled.p`
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, pass }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userId", data.user.id);

      if (data.user.role === "admin") {
        login({ username: data.user.name, role: data.user.role });
        navigate("/admin/dashboard");
      } else {
        login({ username: data.user.name, role: data.user.role });
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <Heading>Login</Heading>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
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
        <Button type="submit">Login</Button>
        <SignUp>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </SignUp>
      </LoginForm>
    </Container>
  );
};

export default Login;
