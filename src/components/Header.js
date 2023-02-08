import React, { useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../redux/thunk/fetchUserProfileDetails";
import { logout } from "../redux/user/actions";
import css from "../Styles/NavBar.module.css";

function Header() {
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userProfileDetails = useSelector((state) => state.userProfileDetails);
  const { user } = userProfileDetails;
  const { first_name, last_name } = userInfo ? userInfo : "";
  const logoutHandler = () => {
    dispatch(logout);
    navigate("/login");
  };
  useEffect(() => {
    if (userInfo) {
      dispatch(fetchUserDetails);
    }
  }, [userInfo, dispatch]);

  return (
    <header>
      <Navbar className={css.NavBar} expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand><h1 className={css.heading}>Let's Meet</h1></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              
              {/* Checks if user is logged in and displays link to their Meets */}
              {userInfo && (
                <LinkContainer to="/myevent">
                  <Nav.Link>Meets</Nav.Link>
                </LinkContainer>
              )}
            </Nav>

            <div
            style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
          >

            {userInfo ? (
              <NavDropdown
                title={
                  <div className="mx-3">
                    <img
                      className="thumbnail-image"
                      src={user && user.profile_pic}
                      alt="user pic"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                }
                className={css.profileImage}
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="#action3">
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    {userInfo && `${first_name} ${last_name}`}
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  <i className="fa fa-sign-out"></i> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav
                className="ms-4 my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Login
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
