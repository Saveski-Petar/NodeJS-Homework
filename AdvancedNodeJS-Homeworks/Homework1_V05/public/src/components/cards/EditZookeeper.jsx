import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import axiosInstance from "../../api/axios";

const EditZookeeper = ({
  selectedZookeeper,
  show,
  handleClose,
  fetchZookeepers,
}) => {
  const [fullName, setfullName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [isActive, setIsActive] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setfullName(selectedZookeeper?.fullName || "");
    setAge(selectedZookeeper?.age || "");
    setLocation(selectedZookeeper?.location || "");
    setIsActive(selectedZookeeper?.isActive || "");
    setRole(selectedZookeeper?.role || "");
    setEmail(selectedZookeeper?.email || "");
  }, [selectedZookeeper]);

  useEffect(() => {
    if (!show) {
      resetForm(selectedZookeeper);
    }
  }, [show, selectedZookeeper]);

  const resetForm = (selectedZookeeper) => {
    setError(null);
    setfullName(selectedZookeeper?.fullName);
    setAge(selectedZookeeper?.age);
    setEmail(selectedZookeeper?.email);
    setLocation(selectedZookeeper?.location);
    setIsActive(selectedZookeeper?.isActive);
    setRole(selectedZookeeper?.role);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedZookeeper = {
        fullName,
        age: parseInt(age),
        location,
        isActive,
        role,
        email,
      };
      await axiosInstance.put(
        `/api/zookeepers/${selectedZookeeper.id}`,
        updatedZookeeper
      );
      handleClose();
      fetchZookeepers();
      console.log("updated");
    } catch (error) {
      if (error.response) {
        setError({
          statusCode: error.response.data?.statusCode,
          message: error.response.data?.message,
        });
      } else {
        setError({
          statusCode: null,
          message: "An error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <>
      <Modal fullscreen="sm-down" show={show} onHide={handleClose}>
        <Modal.Header closeButton className="customDark">
          <Modal.Title>Edit Zookeeper</Modal.Title>
        </Modal.Header>
        {error && (
          <div className="customDark">
            <h3>{error?.statusCode}</h3>
            <ul>
              {error?.message?.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <Modal.Body className="customDark">
          <Form>
            <Row>
              <Col className="d-sm-flex justify-content-between">
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="fit-Placeholder "
                    placeholder="Enter the name of the Zookeeper"
                    autoFocus
                    value={fullName}
                    onChange={(e) => setfullName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="status">
                  <Form.Label>Is Active</Form.Label>
                  <Form.Select
                    value={isActive}
                    onChange={(e) => setIsActive(e.target.value)}
                  >
                    <option disabled value="">
                      Select Status
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    className="fit-Placeholder "
                    placeholder="Enter the new email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="d-sm-flex justify-content-between">
                <Form.Group controlId="age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    className="fit-Placeholder"
                    placeholder="Enter the age of the Zookeeper"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    className="fit-Placeholder"
                    placeholder="Enter the location of the Zookeeper"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="d-flex justify-content-around">
                <Form.Group controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    value={role}
                    disabled
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option disabled value="">
                      Select Role
                    </option>
                    <option value="zookeeper">Zookeeper</option>
                    <option value="user">User</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between customDark">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditZookeeper;
