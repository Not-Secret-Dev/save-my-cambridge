import { useState } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  margin: 1.6% auto;
  padding: 24px;
  border-radius: 16px;
  max-width: 340px;
  background-color: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-color: transparent;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
  background-color: transparent;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 12px;
  outline: none;

  &:focus {
    border-color: #999;
  }
`;

const Select = styled.select`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 12px;
  outline: none;

  &:focus {
    border-color: #999;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #a71d1d;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Message = styled.p`
  margin-top: 10px;
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => (props.$success ? "green" : "crimson")};
  background-color: transparent;
`;

const Uploads = () => {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fileInput = form.file;
    const file = fileInput.files[0];

    if (file && file.type !== "application/pdf") {
      setMessage("❌ Only PDF files are allowed!");
      return;
    }

    const formData = new FormData(form);

    try {
      const res = await fetch("http://localhost:5000/api/files/upload-file", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ " + data.message);
        form.reset();
        setCategory("");
      } else {
        setMessage("❌ " + (data.message || "Upload failed"));
      }
    } catch (err) {
      setMessage("❌ " + err.message || "Failed to upload file.");
    }
  };

  return (
    <MainContainer>
      <h3
        style={{
          textAlign: "center",
          marginBottom: "16px",
          backgroundColor: "transparent",
        }}
      >
        Upload Material
      </h3>

      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" id="name" required />

        <Label htmlFor="category">Category</Label>
        <Select
          name="category"
          id="category"
          required
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="ebooks">Ebooks</option>
          <option value="notes">Notes</option>
          <option value="pastpapers">Past Papers</option>
        </Select>

        <Label htmlFor="subject">Subject</Label>
        <Select name="subject" id="subject" required>
          <option value="">Select subject</option>
          <option value="Islamiat">Islamiat</option>
          <option value="Geography">Geography</option>
          <option value="History">History</option>
        </Select>

        {category === "pastpapers" && (
          <>
            <Label htmlFor="year">Year</Label>
            <Input
              type="number"
              name="year"
              id="year"
              required
              min="2016"
              max={new Date().getFullYear()}
            />
          </>
        )}

        <Label htmlFor="file">Select File</Label>
        <Input
          type="file"
          name="file"
          id="file"
          accept="application/pdf"
          required
        />

        <Button type="submit">Upload</Button>
      </Form>

      {message && (
        <Message $success={message.startsWith("✅")}>{message}</Message>
      )}
    </MainContainer>
  );
};

export default Uploads;
