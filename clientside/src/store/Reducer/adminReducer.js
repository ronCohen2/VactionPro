const initState = {
  allVacation: null,
  err: null,
  updateEror: false,
  users: null,
  favoriteSummary: null,
  followers: null
};
const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case "ALL_VACATION_ADMIN":
      return {
        ...state,
        allVacation: action.data
      };
    case "ALL_VACATION_ADMIN_ERROR":
      return {
        ...state,
        err: "not vacation yet"
      };
    case "ADD_VACATION":
      console.log("push", action.data);
      return {
        ...state,
        allVacation: state.allVacation.concat(action.data),
        err: null
      };
    case "ADD_VACATION_ERROR":
      return {
        ...state,
        err: action.data
      };
    case "DELETE_VACATION":
      const allVacation = state.allVacation;
      const vacationId = action.data;
      const vacationIndex = allVacation.findIndex(
        id => id.unique_id == vacationId
      );
      const vacationAfterDelete = allVacation.splice(vacationIndex, 1);
      return {
        ...state,
        allVacation: allVacation
      };
    case "DELETE_VACATION_ERROR":
      return {
        ...state,
        err: "error in DELETE vacation"
      };
    case "EDIT_VACATION":
      return {
        ...state,
        updateEror: null
      };
    case "EDIT_VACATION_ERROR":
      return {
        ...state,
        updateEror: action.errors
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.users
      };
    case "FAVORITE_SUMMARY":
      return {
        ...state,
        favoriteSummary: action.data
      };
    case "FAVORITE_SUMMARY_ERROR":
      return {
        ...state,
        favoriteSummary: "error in favorite Summary"
      };
    case "GET_FOLLOWERS":
      return {
        ...state,
        followers: action.data
      };
    case "CLEAN_ERR_ADMIN":
      return {
        ...state,
        err: null
      };
    case "CLEAN_ERR_UPDATE":
      return {
        ...state,
        updateEror: null
      };
    default:
      return state;
  }
};
export default adminReducer;
