import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Event from "../components/Event";
import Loading from "../components/Loading";
import fetchEventList from "../redux/thunk/fetchEventList";

function HomeScreen() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const eventList = useSelector((state) => state.eventList);
  const {events, loading} = eventList || [];
  let path = window.location.pathname;
  if(path==="/") {
    console.log("Not");
  }

  useEffect(()=>{
    dispatch(fetchEventList);
  }, [dispatch]);
  
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Events</h1>
        {userInfo && (
          <Link
            to="/newevent"
          >
            <i class="fas fa-plus-circle"></i>Create New Event
          </Link>
        )}
      </div>
      <br />
      {loading && <Loading />}
      <Row>
        {events &&
          events.map((event) => (
            <Col key={event._id} sm={12} md={6} lg={4} xl={4}>
              <Event event={event}/>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default HomeScreen;
