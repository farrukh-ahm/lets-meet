import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import fetchEventAction from "../redux/thunk/fetchEventAction";
import fetchEventDelete from "../redux/thunk/fetchEventDelete";

export default function Event({ event, leave }) {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const {
    author,
    _id,
    image,
    title,
    description,
    create_at,
    deadline,
    members_count,
  } = event;
  let id = _id ? _id : "";
  const dispatch = useDispatch();
  const { name, username } = author ? author : "";
  const current_user = userInfo ? userInfo.username : "";
  let extraaction;
  const deleteAction = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this Opinion?")) {
      dispatch(fetchEventDelete(id));
    }
  };
  const joinButton = (e) => {
    e.preventDefault();
    dispatch(fetchEventAction(_id));
    navigate("/myevent");
  };
  if (username === current_user) {
    extraaction = (
      <Row>
        <Col sm={12} md={6} lg={6} xl={6}>
          <div style={{ margin: "20px 0" }}>
            <Link
              to={`/event/edit/${_id}`}
              style={{
                padding: "12px 40px",
                border: "1px solid blue",
                textDecoration: "none",
              }}
            >
              Edit
            </Link>
          </div>
        </Col>
        <Col sm={12} md={6} lg={6} xl={6}>
          <Button
            type="button"
            className="btn btn-block my-1 "
            variant="outline-danger"
            onClick={deleteAction}
          >
            DELETE
          </Button>
        </Col>
      </Row>
    );
  }

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/event/${_id}`}>
        <Card.Img src={image} />
      </Link>
      <Card.Body>
        <Link
          to={`/event/${_id}`}
          style={{
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          <Card.Title as="div">
            <strong style={{ fontSize: "26px" }}>{title}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <p>{description}</p>
          <div
            style={{
              fontSize: "12px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>Created: {create_at}</p>
            <p style={{ color: "red" }}>Deadline: {deadline}</p>
          </div>
        </Card.Text>
      </Card.Body>
      <Card.Footer as="div">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Author: {name}</p>
          <p>
            Going:{" "}
            <Link
              to={`/event/member/${_id}`}
              style={{ textDecoration: "none" }}
            >
              {members_count} Person
            </Link>
          </p>
        </div>
        {leave && (
          <Button
            type="button"
            className="btn btn-block my-1 "
            variant="outline-info"
            onClick={joinButton}
          >
            Apply For Join
          </Button>
        )}
        {extraaction}
      </Card.Footer>
    </Card>
  );
}
