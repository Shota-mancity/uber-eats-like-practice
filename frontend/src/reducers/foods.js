import { REQUEST_STATE } from "../constants";

export const initState = {
  fetchState: REQUEST_STATE.INITIAL,
  foodsList: []
};

export const foodsActionTypes = {
  FETCHING: "FETCHING",
  FETCH_SUCCESS: "FETCH_SUCCESS"
};

export const foodsReducer = (state, action) => {
  switch (action.type) {
    case foodsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING
      };
    //   ローディング中に返すstate
    case foodsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        foodsList: action.payload.foods
      };
      //   APIリクエスト成功時に返すstate
    default:
      throw new Error();
  }
};
