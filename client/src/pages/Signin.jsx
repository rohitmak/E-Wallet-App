import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BottomWarning from "../components/BottomWarning.jsx";
import Button from "../components/Button.jsx";
import Header from "../components/Header.jsx";
import Heading from "../components/Heading.jsx";
import InputBox from "../components/InputBox.jsx";
import SubHeading from "../components/SubHeading.jsx";
import backendURL from "../config.js";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign in"} />
            <SubHeading
              label={"Enter your credentials to access your account"}
            />
            <InputBox
              placeholder="abc123@gmail.com"
              label={"username"}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputBox
              placeholder="******"
              label={"Password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="pt-4">
              <Button
                onClick={async () => {
                  if (!username || !password) {
                    alert("Please Enter all the fields");
                    return;
                  }

                  const response = await axios.post(
                    `${backendURL}/user/signin`,
                    {
                      username,
                      password,
                    }
                  );
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                }}
                label={"Sign in"}
              />
            </div>
            <BottomWarning
              label={"Don't have an account?"}
              buttonText={"Sign up"}
              to={"/signup"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
