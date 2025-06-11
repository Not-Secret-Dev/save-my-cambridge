import styled from "styled-components";
import Card from "../components/Ebooks/Cards/Card";

const EbookWrapper = styled.div`
  padding: 2rem;
  background-color: transparent;
`;

const QuickLinks = styled.section`
  margin: 10rem auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 0;
`;

const subjects = [
  {
    heading: "Islamiat",
    description: "Islamiat Past Papers",
    path: "/past-papers/islamiat",
  },
  {
    heading: "Geography",
    description: "Geography Past Papers",
    path: "/past-papers/geography",
  },
  {
    heading: "History",
    description: "History Past Papers",
    path: "/past-papers/history",
  },
];

const PastPapers = () => {
  return (
    <EbookWrapper>
      <QuickLinks>
        {subjects.map((subject, index) => {
          return <Card key={index} {...subject} />;
        })}
      </QuickLinks>
    </EbookWrapper>
  );
};

export default PastPapers;
