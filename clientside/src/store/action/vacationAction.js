export const getAllVacation = () => {
  return (dispatch, getState) => {
    fetch("http://localhost:5050/api/users/vacation", {
      method: "GET",
      headers: {
        "x-token": localStorage.getItem("x-token")
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "ALL_VACATION", data: data });
      })
      .catch(() => {
        dispatch({ type: "ALL_VACATION_ERR" });
      });
  };
};
export const getVacationDetails = id => {
  return (dispatch, getState) => {
    fetch(`http://localhost:5050/api/admin/vacation/${id}`, {
      method: "GET",
      headers: {
        "x-token": localStorage.getItem("x-token")
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "VACATION_DETAILS", data: data[0] });
      })
      .catch(() => {
        console.log("failed");
        // dispatch({ type: "VACATION_DETAILS_ERROR" });
      });
  };
};
export const FollowVacation = (data, user_id) => {
  return (dispatch, getState) => {
    fetch(`http://localhost:5050/api/users/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem("x-token")
      },
      body: JSON.stringify({ userId: user_id, vacationId: data.unique_id })
    })
      .then(() => {
        console.log("user follow");
        dispatch({
          type: "FOLLOW_VACATION",
          data: data
        });
      })
      .catch(() => alert("ERROR:Error in follow"));
  };
};
export const UnFollowVacation = (data, user_id) => {
  return (dispatch, getState) => {
    fetch(`http://localhost:5050/api/users/Unfollow`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem("x-token")
      },
      body: JSON.stringify({ userId: user_id, vacationId: data.unique_id })
    })
      .then(() => {
        console.log("user Unfollow", data);
        dispatch({
          type: "UNFOLLOW_VACATION",
          data: data
        });
      })
      .catch(() => {
        alert("ERROR:Error in unfollow");
      });
  };
};
export const getUserFollowVacation = id => {
  return (dispatch, getState) => {
    fetch(`http://localhost:5050/api/users/favorite/${id}`, {
      method: "GET",
      heders: {
        "x-token": localStorage.getItem("x-token")
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("favorite is ", data);
        dispatch({ type: "USER_FOLLOW_VACATION", data: data });
      })
      .catch(() => {
        console.log("failed");
      });
  };
};
