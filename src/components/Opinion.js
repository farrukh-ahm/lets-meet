import React, { useState } from "react";
import { Button, Col, Form, Image, NavDropdown, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import fetchEventOpinionDelete from "../redux/thunk/fetchEventOpinionDelete";
import fetchEventOpinionEdit from "../redux/thunk/fetchEventOpinionEdit";

function Opinion({ opinion }) {
  const [opinionText, SetOpinionText] = useState(opinion.opinion);
  const [editBtn, SetEditBtn] = useState(false);
  const timestamp = opinion.date_created;
  const opinion_id = opinion ? opinion.id : "";
  const event_id = opinion ? opinion.event_id : "";
  const date = new Date(timestamp);
  const datetime = date && date.toISOString().split("T");
  const dateString = datetime[0];
  const dispatch = useDispatch();
  const deleteButton = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this Opinion?")) {
      dispatch(fetchEventOpinionDelete(event_id, opinion_id));
    }
  };
  const opinionSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(fetchEventOpinionEdit(event_id, opinion_id, opinionText));
    SetEditBtn((toggle) => !toggle);
  };
  const editAction = (e) => {
    SetEditBtn((toggle) => !toggle);
  };

  return (
    <div>
      <Row>
        <Col sm={12} md={12} lg={12} xl={12}>
          <div
            style={{
              display: "flex",
            }}
          >
            <Image
              src={opinion.opinioner_image}
              style={{ width: "40px", height: "40px", margin: "10px" }}
            />
            <div style={{ margin: "13px", lineHeight: "12px" }}>
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                {opinion.opioner_name}
              </p>
              <p>{dateString}</p>
            </div>
            <div>
              <NavDropdown
                title={
                  <div className="mx-3 my-3">
                    <i class="fa-solid fa-box"></i>Option
                  </div>
                }
                id="navbarScrollingDropdown"
                style={{ margin: "13px 60px" }}
              >
                <NavDropdown.Item href="#action3" onClick={editAction}>
                  <i class="fa-thin fa-file-pen"></i> Edit
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4" onClick={deleteButton}>
                  <i class="fa-solid fa-trash" style={{ color: "red" }}></i>{" "}
                  Delete
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        {editBtn ? (
          <Col sm={12} md={12} lg={12} xl={12}>
            <Row>
              <Col sm={12} md={6} lg={6} xl={6}>
                <Form>
                  <Form.Group controlId="email">
                    <Form.Control
                      type="text"
                      placeholder="Write Your Opinion"
                      value={opinionText}
                      onChange={(e) => SetOpinionText(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Form>
              </Col>
              <br />
              <Col sm={12} md={6} lg={6} xl={6}>
                <Button
                  type="submit"
                  variant="primary"
                  onClick={opinionSubmitHandler}
                >
                  Edit Confirm
                </Button>
              </Col>
            </Row>
          </Col>
        ) : (
          <Col sm={12} md={12} lg={12} xl={12}>
            <p
              style={{
                padding: "20px",
                fontSize: "15px",
                color: "#000000",
                lineHeight: "27.8571px",
                fontWeight: "400",
              }}
            >
              {opinion.opinion}
            </p>
          </Col>
        )}
      </Row>
      <hr />
    </div>
  );
}

export default Opinion;
