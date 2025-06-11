import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const HomeWrapper = styled.div`
  padding: 0.9rem;
  background-color: transparent;
`;

const Hero = styled.section`
  text-align: center;
  padding: 3rem 1rem;
  background: #fceeee;
  background-color: transparent;

  h1 {
    font-size: 2.5rem;
    color: #421818;
  }

  p {
    font-size: 1.1rem;
    margin: 1rem 0;
    color: #5a2e2e;
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;

    a {
      padding: 0.8rem 1.5rem;
      background: #a71d1d;
      color: white;
      border-radius: 5px;
      text-decoration: none;
      font-weight: bold;
      transition: 0.3s;

      &:hover {
        background: #421818;
      }
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: large;
    }

    p {
      font-size: 0.7rem;
    }

    .cta-buttons {
      margin-top: 1.5rem;
    }
    .cta-buttons a {
      padding: 0.4rem 1rem;
      font-size: small;
      font-weight: normal;
    }
  }
`;

const QuickLinks = styled.section`
  margin: 4rem 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;

  .card {
    flex: 1 1 200px;
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    background-color: transparent;

    h3 {
      margin-bottom: 0.5rem;
    }

    a {
      text-decoration: none;
      color: #a71d1d;
      font-weight: bold;
    }

    a:hover {
      color: #421818;
    }
  }

  @media (max-width: 768px) {
    margin: 1rem 0;

    h3 {
      font-size: small;
    }

    p {
      font-size: 0.6rem;
    }

    .card {
      padding: 1rem 0.4rem;
      font-size: small;
      font-weight: normal;
    }
  }
`;

const Home = () => {
  const user = useAuth();
  return (
    <HomeWrapper>
      <Hero>
        <h1>
          Welcome to <span style={{ color: "#a71d1d" }}>SaveMyCambridge</span>
        </h1>
        <p>
          Free access to top-quality notes, eBooks, and past papers for O & A
          Level students.
        </p>
        <div className="cta-buttons">
          <Link to="/ebooks">Browse E-Books</Link>
          {user ? (
            <Link to="/login">Login / Sign Up</Link>
          ) : (
            <Link to="/dashboard">Go To Dashboard</Link>
          )}
        </div>
      </Hero>

      <QuickLinks>
        <div className="card">
          <h3>E-books</h3>
          <p>Explore subject-wise Cambridge eBooks</p>
          <Link to="/ebooks">Browse →</Link>
        </div>
        <div className="card">
          <h3>Notes</h3>
          <p>Handpicked notes for better prep</p>
          <Link to="/notes">Browse →</Link>
        </div>
        <div className="card">
          <h3>Past Papers</h3>
          <p>Past papers by year and variant</p>
          <Link to="/past-papers">Browse →</Link>
        </div>
      </QuickLinks>
    </HomeWrapper>
  );
};

export default Home;
