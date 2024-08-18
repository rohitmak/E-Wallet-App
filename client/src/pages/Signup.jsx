import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BottomWarning from "../components/BottomWarning.jsx";
import Button from "../components/Button.jsx";
import Heading from "../components/Heading.jsx";
import InputBox from "../components/InputBox.jsx";
import SubHeading from "../components/SubHeading.jsx";
import Header from "../components/Header.jsx";
import backendURL from "../config.js";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign up"} />
            <SubHeading label={"Create an account"} />
            <InputBox
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="Rohit"
              label={"First Name"}
            />
            <InputBox
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="Makwana"
              label={"Last Name"}
            />
            <InputBox
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="example123@gmail.com"
              label={"Email"}
            />
            <InputBox
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="******"
              label={"Password"}
            />
            <div className="pt-4">
              <Button
                onClick={async () => {
                  if (!firstName || !lastName || !username || !password) {
                    alert("Please Enter all the fields");
                    return;
                  }

                  await axios.post(`${backendURL}/user/signup`, {
                    username,
                    firstName,
                    lastName,
                    password,
                  });
                  navigate("/signin");
                }}
                label={"Sign up"}
              />
            </div>
            <BottomWarning
              label={"Already have an account?"}
              buttonText={"Sign in"}
              to={"/signin"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
