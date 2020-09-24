const initialState = {
  loading: false,
  items: [],
  postCreating: false,
  deleting: false,
};

export default function broadcasts(state = initialState, action) {
  switch (action.type) {
    case "live/load/started":
      return {
        ...state,
        items: [],
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

    case "post/delete/started":
      return {
        ...state,
        deleting: true,
      }

    case "post/delete/succeed":
      return {
        ...state,
        deleting: false,
      }

    default:
      return state;
  }
}
