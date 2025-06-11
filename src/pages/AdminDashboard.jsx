import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Wrapper = styled.section`
  padding: 2rem;
`;

const Heading = styled.h2`
  color: #421818;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const AdminCard = styled(Link)`
  flex: 1 1 200px;
  background: #fff;
  border: 2px solid #421818;
  padding: 1.2rem;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  color: #421818;
  font-weight: 600;
  transition: 0.3s ease;

  &:hover {
    background-color: #421818;
    color: #fff;
    transform: scale(1.05);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const admin = localStorage.getItem("userName");
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
      <Heading>Hello, {admin.name || "Admin"} 👋</Heading>

      <Grid>
        <AdminCard to="/ebooks">📘 Manage E-books</AdminCard>
        <AdminCard to="/notes">📝 Manage Notes</AdminCard>
        <AdminCard to="/past-papers">📂 Manage Past Papers</AdminCard>
        <AdminCard to="/admin/uploads">📤 Upload Files</AdminCard>
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

export default AdminDashboard;
