import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import fetchEventAction from "../redux/thunk/fetchEventAction";
import fetchEventDelete from "../redux/thunk/fetchEventDelete";
import styles from "../Styles/Buttons.module.css"
import head from "../Styles/Heads.module.css"


// Fetches the Event information, to be displayed on homepage, my-events page, and EventScreen

export default function Event({ event }) {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [join, setJoin] = useState(false);
  const [extrawork, setExtrawork] = useState(true);

  const {
    author,
    _id,
    image,
    title,
    description,
    create_at,
    deadline,
    members,
    members_count,
  } = event;


  // Get all members joining a Meet
  let member_name = members?.map((member) => member.username);
  let id = _id ? _id : "";
  const dispatch = useDispatch();
  const { name, username } = author ? author : "";
  const current_user = userInfo ? userInfo.username : "";
  let extraaction;
  let joining;

  // Meet Delete Handler for the Author
  const deleteAction = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this Meet?")) {
      dispatch(fetchEventDelete(id));
    }
  };

  // Joining Handler
  const joinButton = (e) => {
    e.preventDefault();
    if (userInfo){
      dispatch(fetchEventAction(_id));
      navigate("/myevent");
    } else {
      alert("Please Log In To Join");
    }  
  };

  // Leaving a meet Handler
  const leaveButton = (e) => {
    e.preventDefault();
    if (userInfo){
      dispatch(fetchEventAction(_id));
      navigate("/")
    }else{
      alert("Not Authorized");
    }
  }

  // Checks if the user is the author and provides extra options
  if (username === current_user) {
    extraaction = (
      <div className="d-flex gap-2">
            <Link
              to={`/event/edit/${_id}`}
            >
              <Button
                className={styles.EditBtn}
                size="sm"
                >
                  Edit
                </Button>
            </Link>
          <Button
            className={styles.DeleteBtn}
            size="sm"
            onClick={deleteAction}
          >
            Delete
          </Button>
      </div>
    );
  }

  // Checks if user is attending the meet and displays buttons accordingly
  if(userInfo){
    if(member_name?.includes(userInfo.username)){
      joining = (
        <Row>
          <Col sm={12} md={6} lg={6} xl={6}>
            <div style={{ margin: "20px 0" }}>
              <Link
                to={`/myevent`}
              >
                <Button
                  className={styles.JoinedBtn}
                  size="sm"
                >
                  Joined
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      )
    }else{
      joining = (
        <Row>
          <Col sm={12} md={6} lg={6} xl={6}>
          <Button
              type="button"
              className={join? styles.DeleteBtn : styles.JoinBtn}
              onClick={joinButton}
            >
              Join
            </Button>
          </Col>
        </Row>
      )
    }
  
  }else{
    joining = (
      <Row>
        <Col sm={12} md={6} lg={6} xl={6}>
        <Button
            type="button"
            className={join? styles.DeleteBtn : styles.JoinBtn}
            onClick={join ? leaveButton : joinButton}
          >
            {join ? "Leave" : "Join"}
          </Button>
        </Col>
      </Row>
    )
  }
  
  // ExtraWork handler for homepage and other event pages
  useEffect(()=>{
    if(userInfo){
      setJoin(member_name?.includes(userInfo.username));
      let path = window.location.pathname;
      if(path==="/"){
        setExtrawork(false)
      }else{
        setExtrawork(true)
      }
    }
  }, [userInfo, setJoin, member_name, setExtrawork])

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
            <h3 className={head.Heads}>{title}</h3>
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
            <p style={{ color: "red" }}>Meet Date: {deadline}</p>
          </div>
        </Card.Text>
      </Card.Body>
      <Card.Footer as="div">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Author: {name}</p>
          <p>
            Joining:{" "}
            <Link
              to={`/event/member/${_id}`}
              style={{ textDecoration: "none" }}
            >
              {members_count} Person
            </Link>
          </p>
        </div>
          {!extrawork && joining }
          
        {extrawork && extraaction}
      </Card.Footer>
    </Card>
  );
}
