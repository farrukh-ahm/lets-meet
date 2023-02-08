import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import Edit from "../components/Edit";
import Event from "../components/Event";
import Info from "../components/Info";
import Loading from "../components/Loading";
import fetchAuthorEventList from "../redux/thunk/fetchAuthorEventList";
import fetchUserDetails from "../redux/thunk/fetchUserProfileDetails";
import fetchUpdateUserProfile from "../redux/thunk/fetchUserProfileUpdate";
import heads from "../Styles/Heads.module.css"
import btn from "../Styles/Buttons.module.css"


// Handles and Enables Editing the Profile Page
function ProfileScreen() {
  const navigate = useNavigate();
  const [upload, setUpload] = useState(false);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState("");
  const [editFirstname, setEditFirstname] = useState("");
  const [editLastname, setEditLastname] = useState("");
  const [uploading, setUploading] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const authorEventList = useSelector((state) => state.authorEventList);
  const { events } = authorEventList ? authorEventList : "";
  const dispatch = useDispatch();
  const userProfileDetails = useSelector((state) => state.userProfileDetails);
  const { user } = userProfileDetails && userProfileDetails;
  let name = userInfo && `${userInfo.first_name} ${userInfo.last_name}`;
  const eventDelate = useSelector((state) => state.eventDelate);
  const { success } = eventDelate;


  // Check whether user is authorised
  useEffect(() => {
    if (userInfo) {
      dispatch(fetchUserDetails);
      dispatch(fetchAuthorEventList);
    } else {
      navigate("/");
    }
  }, [userInfo, dispatch, navigate, success]);
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profile_image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/profile/profileupload/",
        formData,
        config
      );
      setUpload(true);
      setImage(data);
      setUploading(false);
      setUpload(false);
    } catch (error) {
      setUploading(false);
    }
  };

  // Editing the profile page
  const editHandleing = (e) => {
    e.preventDefault();
    dispatch(fetchUpdateUserProfile(editFirstname, editLastname));
    setEdit(false);
  };

  // Enables the editing feature
  const editOpening = (e) => {
    e.preventDefault();
    setEdit(true);
  };

  // Passing the Values for the Edit Page
  const passValue = (first_name, last_name) => {
    setEditFirstname(first_name);
    setEditLastname(last_name);
  };


  return (
    <Container>
      <h4 className={heads.Heads} style={{ textAlign: "center" }}>Hello @{user && user.username}</h4>
      <br />
      <br />
      <Row>
        <Col className="d-flex justify-content-center">
          <div style={{ margin: "20px auto", textAlign: "center" }}>
            <Image
              src={user && user.profile_pic}
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
              }}
            />
            </div>
          </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <div style={{ margin: "20px auto" }}>
            {uploading && <Loading />}
            {upload && alert(image)}
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <div style={{ margin: "20px auto" }}>
            {edit ? (
              <div style={{ margin: "10px auto" }}>
                <Row>
                  <Col className="d-flex justify-content-center" style={{flexDirection: "column"}}>
                  {uploading && <Loading />}
                  {upload && alert(image)}
                  <label style={{ color: "#DB5E31", fontSize: "16px", textAlign: "center"}}>
                    Change Profile Pic
                  </label>
                  <br />
                  <input
                    type="file"
                    name="profile_pic"
                    id="profile_pic"
                    onChange={uploadFileHandler}
                    style={{textAlign: "center"}}
                  />
                  </Col>
                </Row>
              <Edit passValue={passValue} />
              </div>
            ) : (
              <Info user={user ? user : ""} name={name} />
            )}

            {edit ? (
              <Row>
                <Col className="d-flex align-content-start gap-3">
                <Button className={btn.JoinBtn} onClick={editHandleing}>
                  Save
                </Button>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button className={btn.DeleteBtn}>
                    Cancel
                  </Button>
                </Link>
                </Col>
              </Row>
            ) : (
              <Button className={btn.JoinedBtn} onClick={editOpening}>
                Edit
              </Button>
            )}
          </div>
        </Col>
      </Row>
        <br />
        <br />
        <hr />
    <Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <h4 style={{textTransform: "capitalize"}}>My Created Events:</h4>
        </Col>
      </Row>
        <Row>
          {events &&
            events.map((myevent) => (
              <Col key={myevent._id} sm={12} md={6} lg={6} xl={6}>
                <Event event={myevent} />
              </Col>
            ))}
        </Row>
    </Row>
    <br />
    <br />
    <br />
    <br />
    </Container>
  );
}

export default ProfileScreen;
