import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import fetchEventDetails from "../redux/thunk/fetchEventDetails";
import heads from "../Styles/Heads.module.css"

// Handles all the members attending a meet
function MemberScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const eventDetails = useSelector((state) => state.eventDetails);
  const { event } = eventDetails && eventDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);

  // Authenticates the user. If not logged-in, redirects to homepage
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    dispatch(fetchEventDetails(id));
  }, [id, dispatch, userInfo, navigate]);
  const { title, members } = event ? event : "";

  return (
    <Container>
      <h2 style={{ textAlign: "center" }} className={heads.Heads}>{title}</h2>
      <br />
      <br />
      <h4 style={{ textTransform: "lowercase" }}>
        Hello @{userInfo && userInfo.username}
      </h4>
      <br />
      <br />
      <br />
      <p>People attending the meet:</p>
      <br />
      <br />
      <Row>
        {members?.map((member, index) => {
          return (
            <Col key={event._id} sm={12} md={12} lg={12} xl={12}>
              <p style={{ padding: "10px 30px" }}>
                {index + 1}. {member.name}
              </p>
              <hr />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default MemberScreen;
