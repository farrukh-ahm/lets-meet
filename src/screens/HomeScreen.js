import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Event from "../components/Event";
import Loading from "../components/Loading";
import fetchEventList from "../redux/thunk/fetchEventList";
import css from "../Styles/Heads.module.css"


// Handles the display of the Home Page
function HomeScreen() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const eventList = useSelector((state) => state.eventList);
  const {events, loading} = eventList || [];
  let path = window.location.pathname;

  // Fetches all the events
  useEffect(()=>{
    dispatch(fetchEventList);
  }, [dispatch]);
  
  return (
    <div>
      <div className="d-flex justify-content-center">
        <h2 className={css.Heads}>Events</h2>
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
