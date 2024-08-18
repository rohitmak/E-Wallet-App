import React, { useState, useEffect } from "react";
import Appbar from "../components/Appbar.jsx";
import Balance from "../components/Balance.jsx";
import Users from "../components/Users.jsx";
import { useNavigate } from "react-router-dom";
import backendURL from "../config.js";
import axios from "axios";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      navigate("/signin");
    } else {
      const fetchBalance = async () => {
        try {
          const response = await axios.get(`${backendURL}/account/balance`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          setBalance(response.data.balance);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      };
      fetchBalance();
    }
  }, [token, navigate]);

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
