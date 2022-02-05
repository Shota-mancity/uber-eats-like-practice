import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

// reducers
import { orderActionTypes, initialState, reducer } from "../reducers/orders";

// apis
import { fetchOrder, postOrder } from "../apis/orders";

// components
import { OrderDetailItem } from "../components/OrderDetailItem";
import { OrderButton } from "../components/buttons/button_style";
import { HeaderWrapper, MainLogoImage } from "../components/StyledHeader";

// constants
import { REQUEST_STATE } from "../constants";

// images
import MainLogo from "../images/logo.png";

const OrderWrapper = styled.div`
  text-align: center;
`;

export const Orders = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: orderActionTypes.FETCHING });
    fetchOrder()
      .then(data => {
        dispatch({
          type: orderActionTypes.FETCH_SUCCESS,
          payload: { orderFoods: data }
        });
      })
      .catch(e => console.error(e));
  }, []);

  const confirmOrder = () => {
    dispatch({ type: orderActionTypes.POSTING });
    postOrder({ line_food_ids: state.ordersList.line_food_ids }).then(() => {
      dispatch({ type: orderActionTypes.POST_SUCCESS });
      //   orderのポストが成功すると、orders_controllerによってordersモデルのメソッドが実行され、lineFoodsのactiveがfalseとなる
      window.location.reload();
      //   画面をリロード
      //   orderページが再読み込みされ、activeなlineFoodsがないため、サーバーからは空データと204 No Contentが返ってくる
      //   そのためordersListには空配列が入り、「注文予定の商品はありません」に表示が変わる
    });
  };

  const isExistsOrdersList = () => (
    state.fetchStatus === REQUEST_STATE.OK && state.ordersList
  );
//   アロー関数の中身を返したい場合は、アロー関数を{}で囲んでreturnをつけるか、()で囲むか

  const buttonMessage = () => {
    switch (state.postStatus) {
      case REQUEST_STATE.LOADING:
        return "注文中...";
      case REQUEST_STATE.OK:
        return "注文が完了しました!";
      default:
        return "注文を確定する";
    }
  };

  return (
    <>
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
      </HeaderWrapper>

      <OrderWrapper>
        <div>
          {state.fetchStatus === REQUEST_STATE.LOADING ? (
            //   リロード時もLOADINGの過程あり
            <CircularProgress />
          ) : (
            state.ordersList && (
              //   注文が完了するとlineFoodsのactiveがfalseになるため、ordersListが空になる
              <OrderDetailItem
                //   restaurant={state.ordersList.restaurant}
                restaurantId={state.ordersList.restaurant.id}
                restaurantName={state.ordersList.restaurant.name}
                timeRequiered={state.ordersList.restaurant.time_required}
                count={state.ordersList.count}
                amount={state.ordersList.amount}
                shippingFee={state.ordersList.restaurant.fee}
              />
              // <p>{state.ordersList.restaurant.id}</p>
            )
          )}
        </div>
        <div>
          {isExistsOrdersList() && (
            <OrderButton
              onClick={() => confirmOrder()}
              disabled={
                state.postStatus === REQUEST_STATE.LOADING ||
                state.postStatus === REQUEST_STATE.OK
              }
            >
              {buttonMessage()}
            </OrderButton>
          )}
          {state.fetchStatus === REQUEST_STATE.OK && !state.ordersList && (
            //   ページリロードによって、ordersListには空配列が入る
            <p>注文予定の商品はありません</p>
          )}
        </div>
      </OrderWrapper>
    </>
  );
};
