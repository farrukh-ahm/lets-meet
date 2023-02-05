import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Edit from "../components/Edit";
import Event from "../components/Event";
import Info from "../components/Info";
import Loading from "../components/Loading";
import fetchAuthorEventList from "../redux/thunk/fetchAuthorEventList";
import fetchUserDetails from "../redux/thunk/fetchUserProfileDetails";
import fetchUpdateUserProfile from "../redux/thunk/fetchUserProfileUpdate";

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
  const editHandleing = (e) => {
    e.preventDefault();
    dispatch(fetchUpdateUserProfile(editFirstname, editLastname));
    setEdit(false);
  };
  const editOpening = (e) => {
    e.preventDefault();
    setEdit(true);
  };
  const passValue = (first_name, last_name) => {
    setEditFirstname(first_name);
    setEditLastname(last_name);
  };

  return (
    <Container>
      <h1 style={{ textTransform: "lowercase" }}>@{user && user.username}</h1>
      <br />
      <br />
      <Row>
        <Col sm={12} md={12} lg={4} xl={4}>
          <div style={{ margin: "20px auto", textAlign: "center" }}>
            <Image
              src={user && user.profile_pic}
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
              }}
            />
            <div style={{ margin: "20px auto" }}>
              {uploading && <Loading />}
              {upload && alert(image)}
              <label style={{ color: "blue", fontSize: "20px" }}>
                Change Profile
              </label>
              <br />
              <input
                type="file"
                name="profile_pic"
                id="profile_pic"
                onChange={uploadFileHandler}
              />
            </div>
            {edit ? (
              <Edit passValue={passValue} />
            ) : (
              <Info user={user ? user : ""} name={name} />
            )}

            {edit ? (
              <Button variant="success" onClick={editHandleing}>
                Save
              </Button>
            ) : (
              <Button variant="info" onClick={editOpening}>
                Edit
              </Button>
            )}
          </div>
        </Col>
        <br />
        <br />
        <Col sm={12} md={12} lg={8} xl={8}>
          <h1>My Created Events</h1>
          <Row>
            {events &&
              events.map((myevent) => (
                <Col key={myevent._id} sm={12} md={6} lg={6} xl={6}>
                  <Event event={myevent} />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileScreen;
