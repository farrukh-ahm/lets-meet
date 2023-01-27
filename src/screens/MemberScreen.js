import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import fetchEventDetails from "../redux/thunk/fetchEventDetails";

function MemberScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const eventDetails = useSelector((state) => state.eventDetails);
  const { event } = eventDetails && eventDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    dispatch(fetchEventDetails(id));
  }, [id, dispatch, userInfo, navigate]);
  const { title, members } = event ? event : "";

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <br />
      <h2 style={{ textTransform: "lowercase" }}>
        @{userInfo && userInfo.username}
      </h2>
      <br />
      <h2>Member List</h2>
      <br />
      <br />
      <Row>
        {members?.map((member, index) => {
          return (
            <Col key={event._id} sm={12} md={12} lg={12} xl={12}>
              <h3 style={{ padding: "10px 30px" }}>
                {index + 1}. {member.name}
              </h3>
              <hr />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default MemberScreen;
