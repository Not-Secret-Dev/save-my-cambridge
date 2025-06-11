import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardComponent = styled.div`
  flex: 1 1 200px;
  padding: 2rem 5rem;
  max-width: 12rem;
  height: 5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 1.5px 5px rgba(0, 0, 0, 0.3);
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
`;

const Card = (props) => {
  return (
    <CardComponent className="card">
      <h3>{props.heading}</h3>
      <p>{props.description}</p>
      <Link to={props.path}>Browse →</Link>
    </CardComponent>
  );
};

export default Card;
