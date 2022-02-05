import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton"

// apis
import { fetchRestaurants } from "../apis/restaurants";

// reducers
import {initialState, restaurantsActionTypes, restaurantsReducer} from "../reducers/restaurants";

// components
import {HeaderWrapper, MainLogoImage} from "../components/StyledHeader"

// constants
import {REQUEST_STATE} from "../constants"

// images
import MainLogo from "../images/logo.png";
import MainCoverLogo from "../images/main-cover-image.png";
import RestaurantLogo from "../images/restaurant-image.jpg";

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;
const MainCover = styled.img`
  height: 600px;
`;
const RestaurantWrapper=styled.div`
  display: flex;
  justify-content: space-around;
`
const RestaurantImage=styled.img`
  width: 300px;
  height: 200px;
`
const RestaurantDescription=styled.p`
  font-size: 20px;
  color: black;
  margin: 5px;
`

export const Restaurants = () => {
  const [state, dispatch]=useReducer(restaurantsReducer, initialState);
  // useReducerにはreducer関数と初期stateが引数で渡される
  useEffect(() => {
    dispatch({type: restaurantsActionTypes.FETCHING});
    // dispatchは1つのオブジェクトを配列に受け取る
    // dispatchは関数であり、dispatchを呼び出すことでrestaurantsReducerが呼び出され、action.typeが一致する箇所を実行する
    // dispatchはstateを直接変更するためのものではなく、reducerを通じて間接的に、stateを変更させる
    // dispatchとactionは対応
    fetchRestaurants().then(data=>
      // アロー関数の{}は不要
      // 成功した場合にはfetchRestaurants()がres.dataを返すので、その結果を(data)という引数で受け取る
      dispatch({
        type: restaurantsActionTypes.FETCH_SUCCESS,
        payload: {restaurants: data.restaurants}
        // dataの中身は外部コンポーネントで使えないため、オブジェクトで別名を定義し代入
      })
      // dispatchは1つのオブジェクトを配列に受け取る
    )
  }, []); 

  return (
    <>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverLogo} alt="main cover logo" />
      </MainCoverImageWrapper>

      <RestaurantWrapper>
        {
          state.fetchState===REQUEST_STATE.LOADING ?
            <>
              <Skeleton variant="rect" width={300} height={200} />
              <Skeleton variant="rect" width={300} height={200} />
              <Skeleton variant="rect" width={300} height={200} />
            </>
          :
          state.restaurantsList.map((restaurant, index)=>
        // アロー関数の{}は不要
        <Link to={`/restaurants/${restaurant.id}/foods`} key={index} style={{textDecoration: "none"}}>
            <RestaurantImage src={RestaurantLogo} alt="restaurant logo" />
            <RestaurantDescription>{restaurant.name}</RestaurantDescription>
            <RestaurantDescription>配送料：<span>{restaurant.fee}</span>円</RestaurantDescription>
            <RestaurantDescription>配送時間：<span>{restaurant.time_required}</span>分</RestaurantDescription>
          </Link>
        )}
      </RestaurantWrapper>
    </>
  );
};
