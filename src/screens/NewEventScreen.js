import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import btn from '../Styles/Buttons.module.css'


// Handles Creation of a New Meet
function NewEventScreen() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [deadline, setDeadline] = useState("");
  const [formData, setFormData] = useState("");
  const [uploading, setUploading] = useState(false);
  const [tags, setTags] = useState("");
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("event_file", file);
    setFormData(formData);
  };

  // Check if user logged in or not
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  const postSubmitHandler = async (e) => {
    e.preventDefault();
    setUploading(true);

    formData.append("title", title);
    formData.append("description", description);
    formData.append("details", details);
    formData.append("deadline", deadline);
    formData.append("tags", tags);
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post("/api/event/create/", formData, config);
      console.log(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }

    navigate("/");
  };

  return (
    <Container>
      <Row>
        <Col sm={12} md={12} lg={12} xl={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "30px", fontWeight: "bold" }}>
              Add New Event
            </p>
            <Link to="/" style={{ textDecoration: "none" }}>
              <i class="fa-solid fa-arrow-left"></i> Back
            </Link>
          </div>
        </Col>
      </Row>
      <hr />

      {/* Form for the new event */}
      <Form onSubmit={postSubmitHandler}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          {uploading && <Loading />}
          <Form.Control type="file" onChange={uploadFileHandler} custom />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="details">
          <Form.Label>Details</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            placeholder="Enter Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="deadline">
          <Form.Label>Select Meet Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Due Date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="tags">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Tag"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Button type="submit" className={btn.EditBtn}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default NewEventScreen;
