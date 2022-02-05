import React from "react";
import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import styled from "styled-components";

// components
import { OrderButton } from "../components/buttons/button_style";
import { CountUpButton } from "../components/buttons/CountUpButton";
import { CountDownButton } from "../components/buttons/CountDownButton";

// images
import OrderHeader from "../images/order-header.png";

const OrderImage = styled.img`
  width: 100%;
  height: 200px;
`;
const DescriptionWrapper = styled.div`
  margin: 5px;
`;
const OrderButtonContainer = styled.div`
  display: flex;
`;
const OrderButtonText = styled.p`
  margin: 0;
  width: 85%;
`;
const OrderButtonPrice = styled.p`
  margin: 0;
  padding-top: 4px;
`;

export const FoodModal = ({
  food,
  foodCount,
  isOpen,
  onClose,
  onClickCountDown,
  onClickCountUp,
  onClickOrderButton
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <OrderImage src={OrderHeader} alt="order header" />
      <DialogTitle>{food.name}</DialogTitle>
      <DialogContent>
        <DescriptionWrapper>{food.description}</DescriptionWrapper>
      </DialogContent>
      <DialogActions>
        <CountDownButton
          onClick={() => onClickCountDown()}
          isDisabled={foodCount <= 1}
        />
        <CountUpButton
          onClick={() => onClickCountUp()}
          isDisabled={foodCount >= 9}
        />
        <OrderButton onClick={() => onClickOrderButton()}>
          <OrderButtonContainer>
            <OrderButtonText>{`${foodCount}点を注文に追加`}</OrderButtonText>
            <OrderButtonPrice>{`¥${foodCount * food.price}`}</OrderButtonPrice>
          </OrderButtonContainer>
        </OrderButton>
      </DialogActions>
    </Dialog>
  );
};
