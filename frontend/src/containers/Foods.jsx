import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";

// apis
import { fetchFoods } from "../apis/foods";
import { postLineFoods, replaceLineFoods } from "../apis/line_foods";

// reducers
import { initState, foodsActionTypes, foodsReducer } from "../reducers/foods";

// constants
import { REQUEST_STATE, HTTP_STATUS_CODE } from "../constants";
import { COLORS } from "../style_constants";

// components
import { FoodModal } from "../components/FoodModal";
import { NewOrderConfirmModal } from "../components/NewOrderConfirmModal";
import { LocalMallIcon } from "../components/icons";
import {HeaderWrapper, MainLogoImage} from "../components/StyledHeader"

// images
import MainLogo from "../images/logo.png";
import FoodImage from "../images/food-image.jpg";

const BagIcon = styled.div`
  padding-top: 30px;
`;
const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
  /* セミコロンを必ずつける */
`;
const FoodsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const FoodContent = styled.div`
  width: 400px;
  height: 150px;
  border: 1px solid;
  border-color: ${COLORS.BORDER};
  margin: 10px;
  cursor: pointer;
`;
const FoodLogo = styled.img`
  width: 200px;
  height: 150px;
  float: right;
`;
const FoodName = styled.h5`
  font-size: 17px;
  margin: 15px 0 0 5px;
`;
const FoodDescription = styled.p`
  font-size: 15px;
  margin: 10px 0 0 5px;
`;
const FoodPrice = styled.p`
  font-size: 15px;
  margin: 45px 0 0 5px;
`;

export const Foods = () => {
  // FoodsはrestaurantsIdをもとにAPIコールをするため、restaurantsIdをpropsとして受け取らなければならない
  // React Router v6の場合、useParamsでパラメーターを抽出
  const { restaurantId } = useParams();
  // URL中のパラメータ取得
  const [foodsState, dispatch] = useReducer(foodsReducer, initState);
  const modalInitState = {
    isModalOpen: false,
    isNewOrderConfirmModalOpen: false,
    selectedFood: null,
    selectedFoodCount: 1,
    newRestaurantName: "",
    existingRestaurantName: ""
  };
  const [state, setState] = useState(modalInitState);

  const navigate = useNavigate();

  const submitOrder = () => {
    postLineFoods({
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount
    })
      .then(() => navigate("/orders"))
      .catch(e => {
        if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          setState({
            ...state,
            isModalOpen: false,
            isNewOrderConfirmModalOpen: true,
            // 別レストランの仮注文があれば、レストラン切り替えのモーダルを開ける
            newRestaurantName: e.response.data.new_restaurant,
            existingRestaurantName: e.response.data.existing_restaurant
          });
        } else {
          throw e;
        }
      });
  };

  const replaceOrder = () => {
    replaceLineFoods({
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount
    }).then(() => navigate("/orders"));
  };

  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING });
    fetchFoods(restaurantId)
      // APIリクエスト
      .then(data => {
        dispatch({
          type: foodsActionTypes.FETCH_SUCCESS,
          payload: { foods: data.foods }
        });
        // APIリクエスト成功時に、dispatchを呼び出して、成功時のreducerを実行
      });
  }, []);

  return (
    <>
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIcon>
          <Link to="/orders">
            <ColoredBagIcon />
          </Link>
        </BagIcon>
      </HeaderWrapper>

      <FoodsWrapper>
        {foodsState.fetchState === REQUEST_STATE.LOADING ? (
          <>
            {[...Array(12).keys()].map(i => (
              <FoodContent key={i}>
                <Skeleton variant="rect" width={400} height={150} />
              </FoodContent>
            ))}
          </>
        ) : (
          foodsState.foodsList.map(food => (
            <FoodContent
              key={food.id}
              onClick={() =>
                setState({ ...state, isModalOpen: true, selectedFood: food })
              }
            >
              <FoodLogo src={FoodImage} alt="food image" />
              <FoodName>{food.name}</FoodName>
              <FoodDescription>{food.description}</FoodDescription>
              <FoodPrice>¥{food.price}</FoodPrice>
            </FoodContent>
          ))
        )}
      </FoodsWrapper>

      {state.isModalOpen && (
        //   コンポーネントをレンダリングしなくても、Reactはコンポーネント内部の処理を走らせるので、falseのときにわざわざ処理させるのを防止している
        // 実際にはifがなくても、isModalOpenのBoolean値が変わればModalは自動で開閉する
        <FoodModal
          food={state.selectedFood}
          foodCount={state.selectedFoodCount}
          isOpen={state.isModalOpen}
          onClose={() => setState(modalInitState)}
          onClickCountDown={() =>
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount - 1
            })
          }
          onClickCountUp={() =>
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount + 1
            })
          }
          onClickOrderButton={() => submitOrder()}
          // アロー関数にすることで、クリック時にのみsubmitOrderが呼び出される
          // そのままsubmitOrderを書くと、常に呼び出されてしまう
        />
        // stateの更新等はすべて親コンポーネントで行い、子コンポーネントではpropsの受け渡しのみに留める
      )}
      {state.isNewOrderConfirmModalOpen && (
        <NewOrderConfirmModal
          isOpen={state.isNewOrderConfirmModalOpen}
          onClose={() =>
            setState({
              ...state,
              isNewOrderConfirmModalOpen: false
            })
          }
          onClickReplace={() => replaceOrder()}
          newRestaurant={state.newRestaurantName}
          existingRestaurant={state.existingRestaurantName}
        />
      )}
    </>
  );
};
