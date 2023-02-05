import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import fetchEventDetails from "../redux/thunk/fetchEventDetails";
import fetchEventUpdate from "../redux/thunk/fetchEventUpdate";

function EventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const eventDetails = useSelector((state) => state.eventDetails);
  const { event } = eventDetails && eventDetails;
  const { title, details, description, tags, deadline } = event ? event : "";
  let tagsString = tags?.join(", ");
  useEffect(() => {
    dispatch(fetchEventDetails(id));
  }, [id, dispatch]);
  const [editTitle, setTitle] = useState(title);
  const [editDescription, setDescription] = useState(description);
  const [editDetails, setDetails] = useState(details);
  const [editDeadline, setDeadline] = useState(deadline);
  const [editTags, setTags] = useState(tagsString);
  const postSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      fetchEventUpdate(
        id,
        editTitle,
        editDescription,
        editDetails,
        editDeadline,
        editTags
      )
    );
    navigate("/profile");
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
            <p style={{ fontSize: "30px", fontWeight: "bold" }}>Edit Event</p>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <i class="fa-solid fa-arrow-left"></i> Back
            </Link>
          </div>
        </Col>
      </Row>
      <hr />
      <Form onSubmit={postSubmitHandler}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={editTitle}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            value={editDescription}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="details">
          <Form.Label>Details</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            placeholder="Enter Details"
            value={editDetails}
            onChange={(e) => setDetails(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="deadline">
          <Form.Label>Select Meet Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Due Date"
            value={editDeadline}
            onChange={(e) => setDeadline(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="tags">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Tag"
            value={editTags}
            onChange={(e) => setTags(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default EventEdit;
