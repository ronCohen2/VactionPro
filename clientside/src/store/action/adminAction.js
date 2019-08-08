export const getAllVacationAdmin = () => {
  return (dispatch, getState) => {
    fetch("http://localhost:5050/api/admin/vacation", {
      method: "GET",
      headers: {
        "x-token": localStorage.getItem("x-token")
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "ALL_VACATION_ADMIN", data: data });
      })
      .catch(() => {
        dispatch({ type: "ALL_VACATION_ERR" });
      });
  };
};
export const addVacation = (vacation, ToDashbord) => {
  return (dispatch, getState) => {
    try {
      fetch("http://localhost:5050/api/admin/vacation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("x-token")
        },
        body: JSON.stringify(vacation)
      })
        .then(res => res.json())
        .then(respone => {
          console.log(respone.status == 200);
          if (respone.status == 200) {
            dispatch({
              type: "ADD_VACATION",
              data: respone
            });
            ToDashbord();
          } else if (respone.status == 404) {
            dispatch({ type: "ADD_VACATION_ERROR", data: respone.errors });
          }
        });
    } catch (err) {
      console.log("eror", err);
    }
  };
};
export const removeVacation = vactionId => {
  return (dispatch, getState) => {
    fetch(`http://localhost:5050/api/admin/vacation/${vactionId}`, {
      method: "DELETE",
      headers: {
        "x-token": localStorage.getItem("x-token")
      }
    })
      .then(res => res.json())
      .then(() => {
        console.log("done");
        dispatch({ type: "DELETE_VACATION", data: vactionId });
      })
      .catch(() => {
        console.log("failed");
        // dispatch({ type: "DELETE_VACATION_ERROR" });
        dispatch({ type: "DELETE_VACATION", data: vactionId });
      });
  };
};

export const editVacation = (vactionId, vacationData, ToDashbord) => {
  console.log(vactionId, vacationData);
  return (dispatch, getState) => {
    fetch(`http://localhost:5050/api/admin/vacation/${vactionId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem("x-token")
      },
      body: JSON.stringify(vacationData)
    })
      .then(res => res.json())
      .then(res => {
        if (res.status == 200) {
          dispatch({ type: "EDIT_VACATION" });
          ToDashbord();
        }
        if (res.status == 404) {
          dispatch({ type: "EDIT_VACATION_ERROR", errors: res.EditErrors });
        }
      })
      .catch(() => {
        dispatch({ type: "EDIT_VACATION_ERROR" });
      });
  };
};
export const getAllUsers = users => {
  return (dispatch, getState) => {
    fetch("http://localhost:5050/api/users", {
      method: "GET",
      headers: {
        "x-token": localStorage.getItem("x-token")
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "GET_USERS", users: data });
      })
      .catch(() => {
        alert("Error in get User");
      });
  };
};

export const getFavaoriteVacationSummary = () => {
  return (dispatch, getState) => {
    fetch("http://localhost:5050/api/admin/favoriteSummary", {
      method: "GET",
      headers: {
        "x-token": localStorage.getItem("x-token")
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "FAVORITE_SUMMARY", data: data });
      });
  };
};
export const GetFollowers = users => {
  return (dispatch, getState) => {
    fetch("http://localhost:5050/api/admin/followers", {
      method: "GET",
      headers: {
        "x-token": localStorage.getItem("x-token")
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "GET_FOLLOWERS", data: data });
      });
  };
};
