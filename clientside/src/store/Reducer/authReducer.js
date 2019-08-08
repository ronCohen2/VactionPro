const initState = {
  userConnected: false,
  username: null,
  user_id: null,
  admin: false,
  loginErr: null,
  err: null
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      const user_name = action.user.username;
      const user_id = action.user.user_id;
      const admin = action.user.admin;
      return {
        ...state,
        userConnected: true,
        user_id: user_id,
        username: user_name,
        admin: admin,
        loginErr: null
      };

    case "LOGIN_ERROR":
      console.log("failed");
      return {
        ...state,
        userConnected: false,
        loginErr: action.err
      };
    case "LOGIN_ERROR_EMPTY":
      return {
        ...state,
        userConnected: false,
        loginErr: "Username or Password  is required "
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        userConnected: true,
        user_id: action.user.user_id,
        username: action.user.username,
        err: null,
        admin: "false"
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        userConnected: false,
        err: action.error
      };
    case "REGISTER_CLEAN":
      return {
        ...state,
        err: null
      };
    case "LOGIN_CLEAN":
      return {
        ...state,
        loginErr: null
      };
    case "LOG_OUT":
      localStorage.removeItem("x-token");
      return {
        userConnected: false,
        username: null,
        user_id: null,
        admin: false,
        loginErr: null,
        err: null
      };

    default:
      return state;
  }
};
export default authReducer;
