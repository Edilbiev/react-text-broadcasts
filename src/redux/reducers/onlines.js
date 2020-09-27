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
  creating: false,
  editing: false,
  deleting: false,
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
        creating: true,
      }

    case "online/create/succeed":
      return {
        ...state,
        items: [
          action.payload,
          ...state.items,
        ],
        creating: false,
      }

    case "online/delete/started":
      return {
        ...state,
        deleting: true,
      }

    case "online/delete/succeed":
      return {
        ...state,
        items: [
          action.payload,
          ...state.items,
        ],
        deleting: false,
      }

    case "online/edit/started":
      return {
        ...state,
        editing: true,
      }

    case "online/edit/succeed":
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
