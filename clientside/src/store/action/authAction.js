import React, { Component } from "react";

export const login = credentials => {
  return (dispatch, getState) => {
    const { user_name, password } = credentials;
    fetch(`http://localhost:5050/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user_name,
        password: password
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.status == 200) {
          localStorage.setItem("x-token", user.token);
          dispatch({ type: "LOGIN_SUCCESS", user });
        }
        if (user.status == 404) {
          dispatch({ type: "LOGIN_ERROR", err: user.err });
        }
      })
      .catch(() => {
        dispatch({ type: "LOGIN_ERROR", err: "user is not exist" });
      });
  };
};
export const register = user => {
  return (dispatch, getState) => {
    console.log(user);

    fetch("http://localhost:5050/api/auth/Register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(res => {
        if (res.status == 200) {
          localStorage.setItem("x-token", res.token);
          dispatch({ type: "REGISTER_SUCCESS", user: res });
        }
        if (res.status == 404) {
          dispatch({ type: "REGISTER_ERROR", error: res.errors });
        }
      })
      .catch(() => {
        console.log("failed to register");
      });
  };
};
