import React, { useEffect, useState } from "react";
import styles from "./Counter.module.css";
import {
  loginAsync,
  selectStatus,
  setRefreshToken,
} from "../../slicers/loginSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import axios from "axios";

const LoginButton = () => {
  const MY_SERVER = `http://127.0.0.1:8000/refresh/`;
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectStatus);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [refresh, setrefresh] = useState("second");

  const handleLogin = () => {
    dispatch(loginAsync({ user: username, pwd: password }));
  };

  useEffect(() => {
    const storedRefreshToken = localStorage.getItem("refresh") || "";
    setrefresh(storedRefreshToken);
  }, []);

  const handelRefreshToken = async () => {
    const storedRefreshToken = localStorage.getItem("refresh") || "";
    if (storedRefreshToken) {
      const tokens: any = await axios.post(
        MY_SERVER,
        { refresh: refresh },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(tokens.data);

      sessionStorage.setItem("access", tokens.data.access);
      localStorage.setItem("refresh", tokens.data.refresh);
    }
  };

  return (
    <div>
      <>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />
        <input
          type="checkbox"
          onChange={(e) => dispatch(setRefreshToken(e.target.checked))}
        />
        Remember me?
        <button className={styles.button} onClick={() => handleLogin()}>
          Login
        </button>
      </>

      <button className={styles.button} onClick={() => handelRefreshToken()}>
        Get refresh token
      </button>
    </div>
  );
};

export default LoginButton;
