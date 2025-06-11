import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 2rem;
`;

const Welcome = styled.h2`
  color: #421818;
  margin-bottom: 1rem;
  font-size: xx-large;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const Card = styled(Link)`
  flex: 1 1 200px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 1.2rem;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  color: #421818;
  font-weight: 600;
  transition: 0.3s ease;

  &:hover {
    background-color: #8a4a4a;
    color: #fff;
    transform: scale(1.05);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  padding: 0.7rem 1.4rem;
  background-color: ${({ $danger }) => ($danger ? "#c0392b" : "#421818")};
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: ${({ $danger }) => ($danger ? "#e74c3c" : "#5c2b2b")};
  }
`;

const UserDashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      fetch("/api/users/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      })
        .then((res) => res.text())
        .then((data) => {
          console.log(data);
          localStorage.clear();
          navigate("/signup");
        })
        .catch((err) => {
          console.log("Error deleting user", err);
        });
    }
  };

  return (
    <Wrapper>
      <Welcome>Welcome, {username || "User"}!</Welcome>
      <Grid>
        <Card to="/ebooks">📘 E-books</Card>
        <Card to="/notes">📝 Notes</Card>
        <Card to="/past-papers">📂 Past Papers</Card>
      </Grid>
      <ButtonRow>
        <ActionButton onClick={handleLogout}>🚪 Logout</ActionButton>
        <ActionButton $danger onClick={handleDeleteAccount}>
          🗑️ Delete Account
        </ActionButton>
      </ButtonRow>
    </Wrapper>
  );
};

export default UserDashboard;
