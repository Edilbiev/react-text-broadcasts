const infoMessage = {
  content: "Новые посты",
  separate: true,
  _id: "separate1",
  createdDate: new Date(),
};

const initialState = {
  loading: false,
  backLoading: false,
  items: [],
  temp: [],
  creating: false,
  deleting: false,
  editing: false,
};

export default function broadcasts(state = initialState, action) {
  switch (action.type) {
    case "posts/load/started":
      return {
        ...state,
        items: [],
        loading: true,
      };

    case "posts/load/succeed":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case "post/create/started":
      return {
        ...state,
        creating: true,
      };

    case "post/create/succeed":
      return {
        ...state,
        items: [action.payload, ...state.items],
        creating: false,
      };

    case "post/delete/started":
      return {
        ...state,
        deleting: true,
      };

    case "post/delete/succeed":
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
        deleting: false,
      };

    case "post/edit/started":
      return {
        ...state,
        editing: true,
      };

    case "post/edit/succeed":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }

          return item;
        }),
        editing: false,
      };

    case "backposts/load/started":
      return {
        ...state,
        backLoading: true,
      };

    case "backposts/load/succeed":
      return {
        ...state,
        temp: action.payload,
        backLoading: false,
      };

    case "backposts/append/succeed":
      return {
        ...state,
        temp: [],
        items: [
          ...state.items.filter((item) => !item.separate),
          infoMessage,
          ...state.temp,
        ],
      };

    default:
      return state;
  }
}
