import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Event from "../components/Event";
import fetchMyEventList from "../redux/thunk/fetchMyEventList";
import css from "../Styles/Heads.module.css";

function MyEventScreen() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const myEventList = useSelector((state) => state.myEventList);
  const { events } = myEventList ? myEventList : "";

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchMyEventList);
    } else {
      navigate("/");
    }
  }, [userInfo, dispatch, navigate]);

  let content = [];
  if(events?.length > 0){
    content = 
      events &&
      events.map((myevent) => (
        <Col key={myevent._id} sm={12} md={6} lg={4} xl={4}>
          <Event event={myevent} />
        </Col>
      ))
  }

  if(events?.length === 0){
    content = (
      <div>
        <Row>
          <Col className="d-flex d-flex align-items-center justify-content-center">
            <h3 className={css.Heads}>Empty Event{" "}</h3>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex d-flex align-items-center justify-content-center" style={{ color: "red" }}>
            <p style={{ fontWeight: "bold" }}>
              ( You Haven't Joined Any Meets Yet!)
            </p>
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h2 className={css.Heads}>My Events</h2>
      </div>
      <div className="d-flex justify-content-center">
        {userInfo && (
          <Link
            to="/newevent"
            style={{textDecoration: "none"}}
          >
            <i class="fas fa-plus-circle" style={{fontSize: "1rem", color: "#f0c159"}}></i> New Event
          </Link>
        )}
      </div>
      <br />
      <Row>
        {content}
      </Row>
    </div>
  );
}

export default MyEventScreen;
