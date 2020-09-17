const isAdmin =
  localStorage.getItem("token") === null
    ? false
    : localStorage.getItem("token") !== "";

const initialState = {
  loading: false,
  success: false,
  error: false,
  isAdmin,
  jwt: "",
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case "auth/process/started":
      return {
        ...state,
        loading: true,
      };

    case "auth/process/succeed":
      return {
        ...state,
        jwt: action.payload,
        loading: false,
      };

    case "auth/process/failed":
      return {
        ...state,
        jwt: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
