import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoPersonOutline } from "react-icons/io5";
import { useAuth } from "../../context/AuthProvider";

const navLinks = [
  { label: "E-books", path: "/ebooks" },
  { label: "Notes", path: "/notes" },
  { label: "Past Papers", path: "/past-papers" },
];

const NavbarWrapper = styled.header`
  width: 96%;
  margin: auto;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 999;
`;

const NavbarComponent = styled.nav`
  width: 100%;
  padding: 0.7rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand {
    font-size: 1.3rem;
    font-weight: bold;
    color: #421818;
    transition: 0.4s ease;
    text-decoration: none;

    span {
      color: #a71d1d;
      font-size: 1.5rem;
      font-weight: bolder;
    }

    &:hover {
      cursor: pointer;
      transform: scale(1.03);
    }
  }

  ul {
    display: flex;
    gap: 1.5rem;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;

    li {
      list-style: none;
      font-weight: 500;
      color: #421818;
      transition: transform 0.3s ease, color 0.3s ease;

      &:hover {
        cursor: pointer;
        transform: scale(1.15);
        color: red;
      }
    }

    li a {
      text-decoration: none;
      color: inherit;
      transition: all 0.3s ease;
    }

    li a:hover {
      color: red;
    }
  }

  .login-btn {
    width: 100px;
    height: 36px;
    margin: 0 8px 0 23px;
    background: transparent;
    color: #421818;
    border: 1px solid #421818;
    border-radius: 5px;
    font-weight: bold;
    transition: background 0.3s ease, color 0.3s ease;

    &:hover {
      background: #8a4a4a;
      color: #fff;
      cursor: pointer;
    }
  }

  .profileIcon {
    font-size: 1.5rem;
    margin-left: 1rem;
    transition: 0.4s all;
    color: #333;
  }

  .profileIcon a {
    color: #333;
  }

  .profileIcon:hover {
    color: red;
    cursor: pointer;
    scale: 1.15;
  }
`;

const Navbar = () => {
  const user = useAuth();
  const userRole = localStorage.getItem("userRole");

  const dashboardPath =
    userRole === "admin"
      ? "/admin/dashboard"
      : userRole === "user"
      ? "/dashboard"
      : "/";
  return (
    <NavbarWrapper>
      <NavbarComponent>
        <Link className="brand" to={"/"}>
          <span>Save</span>My<span>Cambridge</span>
        </Link>
        <div className="right">
          <ul>
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
          {!user ? (
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          ) : (
            <div className="profileIcon">
              <Link to={dashboardPath}>
                <IoPersonOutline />
              </Link>
            </div>
          )}
        </div>
      </NavbarComponent>
    </NavbarWrapper>
  );
};

export default Navbar;
