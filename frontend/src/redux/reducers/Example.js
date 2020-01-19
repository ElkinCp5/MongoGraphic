const Example = (state = {}, action = {}) => {
  switch (action.type) {
    case "ON_CHANGE":
      return {
        ...state,
        ...state.data,
        ...action.data
      };
      break;
    default:
      return state;
      break;
  }
};
export default Example;
