const initialState = {
  broadcastCreatorOpened: false,
}

export default function admin(state = initialState, action) {
  switch (action.type) {
    case "broadcast/creator/opened":
      return {
        ...state,
        broadcastCreatorOpened: true
      };

    case "broadcast/creator/closed":
      return {
        ...state,
        broadcastCreatorOpened: false
      };


    default:
      return state
  };
}