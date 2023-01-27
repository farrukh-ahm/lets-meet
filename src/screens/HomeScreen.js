import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Event from "../components/Event";
import Loading from "../components/Loading";
import fetchAuthEventList from "../redux/thunk/fetchAuthEvent";
import fetchEventList from "../redux/thunk/fetchEventList";

function HomeScreen() {
  const disptach = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const eventList = useSelector((state) => state.eventList);
  const { events: allevents, loading: allLoading } = eventList;
  const authEventList = useSelector((state) => state.authEventList);
  const { events: authevents, loading: authLoading } = authEventList;

  let loading = userInfo ? authLoading : allLoading;
  let events = userInfo ? authevents : allevents;
  useEffect(() => {
    if (userInfo) {
      disptach(fetchAuthEventList);
    } else {
      disptach(fetchEventList);
    }
    // setEvents(events);
  }, [disptach, userInfo]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Events</h1>
        {userInfo && (
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
        )}
      </div>
      <br />
      {loading && <Loading />}
      <Row>
        {events &&
          events.map((event) => (
            <Col key={event._id} sm={12} md={6} lg={4} xl={4}>
              <Event event={event} leave={true} />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default HomeScreen;
