import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Event from "../components/Event";
import fetchMyEventList from "../redux/thunk/fetchMyEventList";

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
      <Col sm={12} md={6} lg={4} xl={4} style={{ color: "red" }}>
        Empty Event{" "}
        <span style={{ fontWeight: "bold", textTransform: "uppercase" }}>
          ( You Haven't Joined Any Event)
        </span>
      </Col>
    )
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>My Events</h1>
        <Link
          to="/newevent"
          style={{
            width: "20%",
            background: "#1597d3",
            textDecoration: "none",
            textAlign: "center",
            padding: "15px",
            fontSize: "18px",
            fontWeight: "bolder",
          }}
        >
          Create New Event
        </Link>
      </div>
      <br />
      <Row>
        {content}
      </Row>
    </div>
  );
}

export default MyEventScreen;
