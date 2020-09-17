const reversed =
  localStorage.getItem("reversed") === null
    ? {}
    : JSON.parse(localStorage.getItem("reversed"));

const postsCount =
  localStorage.getItem("postsCount") === null
    ? {}
    : JSON.parse(localStorage.getItem("postsCount"));

const mainEventsBarOpened =
  localStorage.getItem("mainEventsBarOpened") === null
    ? {}
    : JSON.parse(localStorage.getItem("mainEventsBarOpened"));

const initialState = {
  loading: false,
  items: [],
  onlineCreating: false,
  reversed,
  postsCount,
  mainEventsBarOpened,
};

export default function onlines(state = initialState, action) {
  switch (action.type) {
    case "posts/order/reversed":
      const oldValue =
        state.reversed[action.payload] !== undefined
          ? state.reversed[action.payload]
          : false;

      return {
        ...state,
        reversed: {
          ...state.reversed,
          [action.payload]: !oldValue,
        },
      };

    case "posts/count/set":
      return {
        ...state,
        postsCount: {
          ...state.postsCount,
          [action.payload.id]: action.payload.count,
        },
      };

    case "main/events/handled":
      const prevValue =
        state.mainEventsBarOpened[action.payload] !== undefined
          ? state.mainEventsBarOpened[action.payload]
          : false;

      return {
        ...state,
        mainEventsBarOpened: {
          ...state.mainEventsBarOpened,
          [action.payload]: !prevValue,
        },
      };

    case "onlines/load/started":
      return {
        ...state,
        loading: true,
      };

    case "onlines/load/succeed":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case "online/create/started":
      return {
        ...state,
        onlineCreating: true,
      }

    case "online/create/succeed":
      return {
        ...state,
        items: [
          action.payload,
          ...state.items,
        ],
        onlineCreating: false,
      }

    default:
      return state;
  }
}
