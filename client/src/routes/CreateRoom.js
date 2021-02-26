import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { sendEmailLink, viewEmails } from "../auth/emailHelper";
import { isAuthenticated } from "../auth";

const CreateRoom = (props) => {
  const [values, setValues] = useState({
    doctorMail: "",
    relativeOne: "",
    relativeTwo: "",
    relativeThree: "",
    link: "",
  });
  const { user } = isAuthenticated();
  const { doctorMail, relativeOne, relativeTwo, relativeThree, link } = values;

  useEffect(() => {
    viewEmails(user._id)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            doctorMail: data.doctorMail,
            relativeOne: data.relativeOne,
            relativeTwo: data.relativeTwo,
            relativeThree: data.relativeThree,
          });
          //   console.log(data._id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [values]);

  function create() {
    const id = uuid();
    props.history.push(`/room/${id}`);
    setValues((values.link = `${window.location.href}`));
    console.log(values.link);
    sendEmailLink({ ...values })
      .then((data) => {
        if (data.status == "fail") {
          console.log("Email for joining not sent!");
        }
        if (data.status == "success") {
          console.log("Email with joining link sent !");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return <button onClick={create}>Create room</button>;
};

export default CreateRoom;
