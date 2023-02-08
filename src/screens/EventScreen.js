import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Opinion from "../components/Opinion";
import fetchEventAction from "../redux/thunk/fetchEventAction";
import fetchEventDetails from "../redux/thunk/fetchEventDetails";
import fetchEventOpinionCreate from "../redux/thunk/fetchEventOpinionCreate";
import styles from "../Styles/Heads.module.css"
import css from "../Styles/EventScreen.module.css"
import btn from "../Styles/Buttons.module.css"

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
        <Col className="d-flex justify-content-center">
          <h1 className={`${styles.Heads} ${styles.Others}`}>{title}</h1>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
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
          <Image src={image} className={css.Image} />
        </Col>
        <Col className="d-flex justify-content-center">
          {userInfo ? (
            join ? (
              <Button
                className={`${btn.JoinBtn} ${css.customBtn}`}
                onClick={actionHandle}
              >
                Join/Leave
              </Button>
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
        <Col sm={6} md={6} lg={6} xl={6} style={{ color: "#DB5E31" }}>
          Meet Date : {deadline}
        </Col>
      </Row>
      <br />
      <br />
      <div className={css.Adjustment}>
        <p style={{ fontWeight: "700" }}>Author : {author && author.name}</p>
        <pre>
          Joining :
          <Link to={`/event/member/${_id}`} style={{ textDecoration: "none" }}>
            {members_count} Person/People
          </Link>
        </pre>
      </div>
      <br />
      <br />
      <Row>
        <Col sm={12} md={12} lg={12} xl={12} className={css.Border}>
          {details && (
            <p className={css.Description}>
              {details}
            </p>
          )}
        </Col>
      </Row>
      <br />
      <br />
      <hr />
      <br />
      <Row>
        <Col sm={12} md={12} lg={12} xl={12}>
          <h5 className={styles.Heads}>{opinion_count ? opinion_count : <div></div>} Opinion(s) Here: </h5>
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
              className={btn.JoinedBtn}
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
