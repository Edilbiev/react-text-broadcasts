const initialState = {
  loading: false,
  items: [],
  creating: false,
  deleting: false,
  editing: false,
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
        creating: true,
      }

    case "post/create/succeed":
      return {
        ...state,
        items: [
          action.payload,
          ...state.items,
        ],
        creating: false,
      }

    case "post/delete/started":
      return {
        ...state,
        deleting: true,
      }

    case "post/delete/succeed":
      return {
        ...state,
        items: [
          action.payload,
          ...state.items,
        ],
        deleting: false,
      }

    case "post/edit/started":
      return {
        ...state,
        editing: true,
      }

    case "post/edit/succeed":
      return {
        ...state,
        items: [
          action.payload,
          ...state.items,
        ],
        editing: false,
      }

    default:
      return state;
  }
}
