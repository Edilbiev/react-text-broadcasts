const initialState = {
  loading: false,
  items: [],
  postCreating: false,
};

export default function broadcasts(state = initialState, action) {
  switch (action.type) {
    case "live/load/started":
      return {
        ...state,
        loading: true,
      };

    case "live/load/succeed":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case "post/create/started":
      return {
        ...state,
        postCreating: true,
      }

    case "post/create/succeed":
      return {
        ...state,
        items: [
          action.payload,
          ...state.items,
        ],
        postCreating: false,
      }

    default:
      return state;
  }
}
