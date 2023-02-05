import React, { useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../redux/thunk/fetchUserProfileDetails";
import { logout } from "../redux/user/actions";

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
    navigate("/");
  };
  useEffect(() => {
    if (userInfo) {
      dispatch(fetchUserDetails);
    }
  }, [userInfo, dispatch]);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Let's Meet</Navbar.Brand>
          </LinkContainer>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              {userInfo && (
                <LinkContainer to="/myevent">
                  <Nav.Link>Meets</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-4"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>

          <div
            style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
          >
            <Navbar.Toggle aria-controls="navbarScroll" />

            {userInfo ? (
              <NavDropdown
                title={
                  <div className="mx-3">
                    <img
                      className="thumbnail-image"
                      src={user && user.profile_pic}
                      alt="user pic"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                }
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
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
