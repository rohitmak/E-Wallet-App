import React, { useState } from "react";
import Appbar from "../components/Appbar.jsx";
import Balance from "../components/Balance.jsx";
import Users from "../components/Users.jsx";
import { useNavigate } from "react-router-dom";
import backendURL from "../config.js";
import axios from "axios";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [balance, setBalance] = useState(0);
  useEffect(async () => {
    const response = await axios.get(backendURL + "/account/balance", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setBalance(res.data.balance);
  }, []);
  const navigate = useNavigate();
  if (token == null) {
    alert("Please SignIn First");
    return <navigate to="/signin"></navigate>;
  }
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={balance.toFixed(2)} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
