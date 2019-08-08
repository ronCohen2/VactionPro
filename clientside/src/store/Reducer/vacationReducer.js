const initState = {
  vacation: [],
  vacationDeatils: null,
  favVacation: []
};
const vacationReducer = (state = initState, action) => {
  switch (action.type) {
    case "ALL_VACATION":
      return {
        ...state,
        vacation: action.data
      };
    case "VACATION_DETAILS":
      return {
        ...state,
        vacationDeatils: action.data
      };
    case "FOLLOW_VACATION":
      return {
        ...state,
        favVacation: [action.data, ...state.favVacation]
      };

    case "UNFOLLOW_VACATION":
      const filterVacarion = state.favVacation.filter(
        fav => fav.unique_id != action.data.unique_id
      );
      return {
        ...state,
        favVacation: filterVacarion
      };
    case "USER_FOLLOW_VACATION":
      return {
        ...state,
        favVacation: action.data
      };

    default:
      return state;
  }
};
export default vacationReducer;
