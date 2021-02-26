import React, { useEffect, useState } from "react";
import { viewEmails } from "../auth/emailHelper";
import { isAuthenticated } from "../auth";

const ViewEmails = () => {
  const [values, setValues] = useState({
    doctorMail: "",
    relativeOne: "",
    relativeTwo: "",
    relativeThree: "",
    data1: "",
  });
  const { user } = isAuthenticated();
  const { doctorMail, relativeOne, relativeTwo, relativeThree, data1 } = values;

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
          console.log(data._id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [values]);

  return (
    <div>
      <h1>
        Following are your mails on which videoCall link to join will be sent:
      </h1>
      <h1>{doctorMail}</h1>
      <h1>{relativeOne}</h1>
      <h1>{relativeTwo}</h1>
      <h1>{relativeThree}</h1>
    </div>
  );
};

export default ViewEmails;
