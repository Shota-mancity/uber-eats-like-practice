import { REQUEST_STATE } from "../constants";

export const orderActionTypes = {
  FETCHING: "FETCHING",
  POSTING: "POSTING",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  POST_SUCCESS: "POST_SUCCESS"
};

export const initialState = {
  fetchStatus: REQUEST_STATE.INITIAL,
  postStatus: REQUEST_STATE.INITIAL,
  ordersList: null
//   空配列ではなく、必ずnullを与える
// 空配列を使うとorderページのレンダリングがなぜか2回起こり、初回はundefindが参照されてしまう
};

export const reducer = (state, action) => {
  switch (action.type) {
    case orderActionTypes.FETCHING:
      return {
        ...state,
        fetchStatus: REQUEST_STATE.LOADING
      };
    case orderActionTypes.POSTING:
      return {
        ...state,
        postStatus: REQUEST_STATE.LOADING
      };
    case orderActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        fetchStatus: REQUEST_STATE.OK,
        ordersList: action.payload.orderFoods
      };
    case orderActionTypes.POST_SUCCESS:
      return {
        ...state,
        postStatus: REQUEST_STATE.OK
      };
    default:
      throw new Error();
  }
};
