import {REQUEST_STATE} from "../constants"

export const initialState={
    fetchState: REQUEST_STATE.INITIAL,
    restaurantsList:[]
}

export const restaurantsActionTypes={
    FETCHING: "FETCHING", 
    FETCH_SUCCESS: "FETCH_SUCCESS"
}

export const restaurantsReducer=(state, action)=>{
    // actionはdispatchと対応しており、dispatchの引数をオブジェクトとして保持
    // action={type: restaurantsActionTypes.FETCHING} or
    // action={type: restaurantsActionTypes.FETCH_SUCCESS, paylpad: {restaurants: data.restaurants}}
    switch(action.type){
        case restaurantsActionTypes.FETCHING:
        // dispatchが呼び出された際、引数がrestaurantsActionTypes.FETCHINGであれば以下を返す
        return {
            ...state,
            fetchState: REQUEST_STATE.LOADING
            // フロントエンドではfetchStateによってAPI取得状況を判断
        }
        // API取得中はこのstateが返る
        case restaurantsActionTypes.FETCH_SUCCESS:
        return {
            fetchState: REQUEST_STATE.OK,
            restaurantsList: action.payload.restaurants
        }
        // API取得完了時にはこのstateが返る
        default:
        throw new Error();
    }
}