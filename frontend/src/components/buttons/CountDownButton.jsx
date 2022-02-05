import React from "react";
import { RoundButton } from "./button_style";

export const CountDownButton = ({onClick, isDisabled}) => {
  return (
    <>
      <RoundButton onClick={onClick} disabled={isDisabled}>
        -
      </RoundButton>
    </>
  );
};
