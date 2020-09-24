const jwt = localStorage.getItem("token");

const initialState = {
  loading: false,
  success: false,
  error: false,
  isAdmin: false,
  fetching: false,
  authorized: false,
  jwt,
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
        authorized: true
      };

    case "auth/process/failed":
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };

    case "autologin/receive/started":
      return {
        ...state,
        fetching: true,
      }

    case "autologin/receive/succeed":
      return {
        ...state,
        fetching: false,
        isAdmin: action.payload.status === "success",
      }


    default:
      return state;
  }
}
