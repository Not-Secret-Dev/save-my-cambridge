import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";

const Wrapper = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const Heading = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #343a40;
`;

const CardGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  padding: 0;
`;

const FileCard = styled.li`
  position: relative;
  background-color: #fff;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  text-align: center;

  &:hover {
    transform: translateY(-4px);
  }

  a {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
    word-break: break-word;

    &:hover {
      text-decoration: underline;
    }
  }

  .delete-btn {
    position: absolute;
    top: 8px;
    right: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: crimson;
    font-size: 16px;
  }
`;

const Info = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0 0;
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.1rem;
  margin-top: 2rem;
  color: #666;
`;

const PastPapers = () => {
  const { subject } = useParams();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem("userRole").toLowerCase() === "admin";

  useEffect(() => {
    setLoading(true);
    fetch(`/api/files/pastpapers/${subject}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch past papers");
        return res.json();
      })
      .then((data) => {
        setPapers(data);
        setLoading(false);
      })
      .catch(() => {
        setPapers([]);
        setLoading(false);
      });
  }, [subject]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      const res = await fetch("/api/files/delete-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setPapers((prev) => prev.filter((f) => f.id !== id));
      } else {
        alert("Failed to delete the file.");
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  if (loading) return <Message>Loading past papers...</Message>;
  if (!papers.length)
    return <Message>No past papers found for {subject}</Message>;

  return (
    <Wrapper>
      <Heading>{subject.toUpperCase()} Past Papers</Heading>
      <CardGrid>
        {papers.map((paper) => (
          <FileCard key={paper.id || paper._id || paper.path}>
            {isAdmin && (
              <button
                className="delete-btn"
                title="Delete File"
                onClick={() =>
                  handleDelete(paper.id || paper._id || paper.path)
                }
              >
                <FaTrash />
              </button>
            )}
            <a
              href={`http://localhost:5000/${paper.path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {paper.originalName}
            </a>
            <Info>Year: {paper.year || "N/A"}</Info>
            <Info>
              Uploaded: {new Date(paper.uploadedAt).toLocaleDateString()}
            </Info>
          </FileCard>
        ))}
      </CardGrid>
    </Wrapper>
  );
};

export default PastPapers;
