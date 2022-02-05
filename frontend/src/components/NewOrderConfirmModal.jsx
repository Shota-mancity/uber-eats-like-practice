import React from "react";
import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import styled from "styled-components";
import { OrderButton } from "../components/buttons/button_style";

const NewOrderDescription = styled.p`
  font-size: 20px;
`;

export const NewOrderConfirmModal = ({
  isOpen,
  onClose,
  onClickReplace,
  newRestaurant,
  existingRestaurant
}) => {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose} maxWidth="xs">
        <DialogTitle>新規注文を開始しますか？</DialogTitle>
        <DialogContent>
          <NewOrderDescription>
            {`ご注文に${existingRestaurant}の商品が含まれています。
                        新規の注文を開始して、${newRestaurant}の商品を追加してください。`}
          </NewOrderDescription>
        </DialogContent>
        <DialogActions>
          <OrderButton onClick={onClickReplace}>新規注文</OrderButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
