import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Opinion from "../components/Opinion";
import fetchEventAction from "../redux/thunk/fetchEventAction";
import fetchEventDetails from "../redux/thunk/fetchEventDetails";
import fetchEventOpinionCreate from "../redux/thunk/fetchEventOpinionCreate";

function EventScreen() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [join, setJoin] = useState(true);
  const dispatch = useDispatch();
  const [opinionText, SetOpinionText] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const eventDetails = useSelector((state) => state.eventDetails);
  const { event } = eventDetails && eventDetails;
  const eventOpinionCreate = useSelector((state) => state.eventOpinionCreate);
  const { success } = eventOpinionCreate && eventOpinionCreate;

  const eventOpinionDelete = useSelector((state) => state.eventOpinionDelete);
  const { success: deleteSuccess } = eventOpinionDelete && eventOpinionDelete;

  const eventOpinionEdit = useSelector((state) => state.eventOpinionEdit);
  const { success: updateSuccess } = eventOpinionEdit && eventOpinionEdit;

  const submitOpinion = (e) => {
    e.preventDefault();
    dispatch(fetchEventOpinionCreate(id, opinionText));
  };
  const actionHandle = (e) => {
    e.preventDefault();
    dispatch(fetchEventAction(id));
    setJoin((toggle) => !toggle);
    navigate("/");
  };
  useEffect(() => {
    dispatch(fetchEventDetails(id));
  }, [id, dispatch, success, deleteSuccess, updateSuccess]);
  const {
    _id,
    author,
    title,
    image,
    details,
    members_count,
    opinions,
    opinion_count,
    tags,
    deadline,
    create_at,
  } = event ? event : "";

  return (
    <Container>
      <Row>
        <Col sm={12} md={12} lg={12} xl={12}>
          <h1 style={{ textAlign: "center" }}>{title}</h1>
        </Col>
        <Col
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            textAlign: "center",
          }}
        >
          <pre>
            Tags: {" "}
            {tags &&
              tags.map((tag, index) => <span key={index}>{tag} , </span>)}
          </pre>
        </Col>
      </Row>
      <br />
      <Row style={{ textAlign: "center" }}>
        <Col sm={12} md={12} lg={12} xl={12}>
          <Image src={image} style={{ width: "50%", height: "95%" }} />
        </Col>
        <Col sm={12} md={12} lg={12} xl={12}>
          {userInfo ? (
            join ? (
              <button
                className="joinButton"
                style={{ background: "rgb(45, 119, 203)" }}
                onClick={actionHandle}
              >
                Join/Leave
              </button>
            ) : (
              <button
                className="joinButton"
                style={{ background: "red", color: "white" }}
                onClick={actionHandle}
              >
                Rejoin
              </button>
            )
          ) : (
            <div></div>
          )}
        </Col>
      </Row>
      <br />
      <hr />
      <Row style={{ textAlign: "center" }}>
        <Col sm={6} md={6} lg={6} xl={6}>
          Created On : {create_at}
        </Col>
        <Col sm={6} md={6} lg={6} xl={6} style={{ color: "red" }}>
          Meet Date : {deadline}
        </Col>
      </Row>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>Author : {author && author.name}</h4>
        <pre>
          Joining :
          <Link to={`/event/member/${_id}`} style={{ textDecoration: "none" }}>
            {members_count} Person
          </Link>
        </pre>
      </div>
      <br />
      <br />
      <Row>
        <Col sm={12} md={12} lg={12} xl={12}>
          {details && (
            <p
              style={{
                fontSize: "14px",
                fontFamily: "'Roboto', sans-serif",
                lineHeight: "26px",
                color: "#666666",
                fontWeight: "500",
              }}
            >
              {details}
            </p>
          )}
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col sm={12} md={12} lg={12} xl={12}>
          <h3>{opinion_count ? opinion_count : <div></div>} Opinion Here: </h3>
        </Col>
      </Row>
      <br />
      <br />
      {opinions &&
        opinions.map((opinion) => {
          return <Opinion key={opinion.id} opinion={opinion} eventId={_id} />;
        })}
      {userInfo && (
        <Row>
          <Col sm={12} md={12} lg={12} xl={12}>
            <Form>
              <Form.Group controlId="opinionText">
                <Form.Label>Opinion </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="Enter Your Opinion"
                  value={opinionText}
                  onChange={(e) => SetOpinionText(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col sm={12} md={12} lg={12} xl={12}>
            <Button
              type="submit"
              variant="primary"
              style={{ margin: "15px 0px" }}
              onClick={submitOpinion}
            >
              Submit
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default EventScreen;
