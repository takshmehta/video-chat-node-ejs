import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

import { isAuthenticated } from "../auth";
import { updateEmails, viewEmails } from "../auth/emailHelper";

const UpdateEmails = () => {
  const [values, setValues] = useState({
    doctorMail: "",
    relativeOne: "",
    relativeTwo: "",
    relativeThree: "",
  });

  const { doctorMail, relativeOne, relativeTwo, relativeThree } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    viewEmails(user._id)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({
            ...values,
            doctorMail: data.doctorMail,
            relativeOne: data.relativeOne,
            relativeTwo: data.relativeTwo,
            relativeThree: data.relativeThree,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Update = (event) => {
    event.preventDefault();
    viewEmails(user._id)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateEmails(user._id, token, data._id, { ...values });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { user, token } = isAuthenticated();

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">
            Change only those emails which you want to be updated
          </h2>
          <Form onSubmit={Update}>
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

export default UpdateEmails;
