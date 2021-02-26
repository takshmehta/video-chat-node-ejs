import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { isAuthenticated } from "../auth";
import { saveEmails } from "../auth/emailHelper";

const Email = () => {
  const [values, setValues] = useState({
    doctorMail: "",
    relativeOne: "",
    relativeTwo: "",
    relativeThree: "",
    user: "",
  });

  const { user: user1, token } = isAuthenticated();
  const { doctorMail, relativeOne, relativeTwo, relativeThree, user } = values;

  useEffect(() => {
    setValues({ ...values, user: user1._id });
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const savemail = (event) => {
    event.preventDefault();
    saveEmails(user1._id, token, { ...values })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          return setValues({ ...values });
        } else {
          return setValues({
            doctorMail: "",
            relativeOne: "",
            relativeTwo: "",
            relativeThree: "",
            user: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add Emails for quick calls</h2>
          <Form onSubmit={savemail}>
            <Form.Group id="email">
              <Form.Label>DoctorEmail</Form.Label>
              <Form.Control
                type="email"
                name=""
                value={doctorMail}
                onChange={handleChange("doctorMail")}
                required
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>RelativeOneEmail</Form.Label>
              <Form.Control
                type="email"
                name=""
                value={relativeOne}
                onChange={handleChange("relativeOne")}
                required
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>RelativeTwoEmail</Form.Label>
              <Form.Control
                type="email"
                name=""
                value={relativeTwo}
                onChange={handleChange("relativeTwo")}
                required
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>RelativeThreeEmail</Form.Label>
              <Form.Control
                type="email"
                name=""
                value={relativeThree}
                onChange={handleChange("relativeThree")}
                required
              />
            </Form.Group>
            <Button className="w-100" type="submit">
              Save all
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Email;
