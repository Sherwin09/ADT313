import React, { useState, useRef, useCallback } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const [contactNo, setContactNo] = useState("");
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const [status, setStatus] = useState("idle");

  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const middleNameRef = useRef();
  const lastNameRef = useRef();
  const contactNoRef = useRef();

  const navigate = useNavigate();

  const handleOnChange = (event, type) => {
    setIsFieldsDirty(true);
    switch (type) {
      case "email":
        setEmail(event.target.value);
        break;

      case "password":
        setPassword(event.target.value);
        break;

      case "firstName":
        setFirstName(event.target.value);
        break;

      case "middleName":
        setMiddleName(event.target.value);
        break;

      case "lastName":
        setLastName(event.target.value);
        break;

      case "contactNo":
        setContactNo(event.target.value);
        break;

      default:
        break;
    }
  };

  const handleRegister = async () => {
    const data = {
      email,
      password,
      firstName,
      middleName,
      lastName,
      contactNo,
    };
    setStatus("loading");

    try {
      const res = await axios.post("/admin/register", data);
      console.log(res);
      localStorage.setItem("accessToken", res.data.access_token);
      navigate("/main/dashboard");
    } catch (e) {
      console.log(e);
      setStatus("idle");
    }
  };

  return (
    <div className="Register">
      <div className="register-main-container">
        <form>
          <div className="register-form-container">
            <h2>Register</h2>
            <div className="register-form-group">
              <div>
                <div className="register-form-indiv">
                  <label>First Name:</label>
                  <input
                    placeholder=" first name"
                    type="text"
                    ref={firstNameRef}
                    onChange={(e) => handleOnChange(e, "firstName")}
                  />
                </div>
                {isFieldsDirty && firstName === "" && (
                  <span className="register-errors">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <div className="register-form-indiv">
                  <label>Middle Name:</label>
                  <input
                    placeholder=" middle name"
                    type="text"
                    ref={middleNameRef}
                    onChange={(e) => handleOnChange(e, "middleName")}
                  />
                </div>
                {isFieldsDirty && middleName === "" && (
                  <span className="register-errors">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <div className="register-form-indiv">
                  <label>Last Name:</label>
                  <input
                    placeholder=" last name"
                    type="text"
                    ref={lastNameRef}
                    onChange={(e) => handleOnChange(e, "lastName")}
                  />
                </div>
                {isFieldsDirty && lastName === "" && (
                  <span className="register-errors">
                    This field is required
                  </span>
                )}
              </div>

              <div>
                <div className="register-form-indiv">
                  <label>E-mail:</label>
                  <input
                    placeholder=" juan@gmail.com"
                    type="text"
                    ref={emailRef}
                    onChange={(e) => handleOnChange(e, "email")}
                  />
                </div>
                {isFieldsDirty && email === "" && (
                  <span className="register-errors">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <div className="register-form-indiv">
                  <label>Password:</label>
                  <input
                    placeholder=" password"
                    type="password"
                    ref={passwordRef}
                    onChange={(e) => handleOnChange(e, "password")}
                  />
                </div>
                {isFieldsDirty && password === "" && (
                  <span className="register-errors">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <div className="register-form-indiv">
                  <label>Contact No:</label>
                  <input
                    placeholder="09XXXXXXXXXX"
                    type="text"
                    ref={contactNoRef}
                    onChange={(e) => handleOnChange(e, "contactNo")}
                  />
                </div>
                {isFieldsDirty && contactNo === "" && (
                  <span className="register-errors">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <div className="register-submit-container">
              <button
                type="button"
                disabled={status === "loading"}
                onClick={() => {
                  if (status === "loading") {
                    return;
                  }
                  if (email && password && firstName && lastName && contactNo) {
                    handleRegister();
                  } else {
                    setIsFieldsDirty(true);
                    if (email === "") emailRef.current.focus();
                    else if (password === "") passwordRef.current.focus();
                    else if (firstName === "") firstNameRef.current.focus();
                    else if (lastName === "") lastNameRef.current.focus();
                    else if (contactNo === "") contactNoRef.current.focus();
                  }
                }}
              >
                {status === "idle" ? "Register" : "Loading"}
              </button>
            </div>
            <div className="login-container">
              <label>
                <small>Already have an account?</small>
              </label>
              <a href="/">
                <small>Login</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
