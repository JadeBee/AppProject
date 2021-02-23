import * as ActionTypes from "./ActionTypes";

export const services = (
  state = { isLoading: true, errMess: null, services: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_CAMPSITES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        services: action.payload,
      };

    case ActionTypes.CAMPSITES_LOADING:
      return { ...state, isLoading: true, errMess: null, services: [] };

    case ActionTypes.CAMPSITES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
