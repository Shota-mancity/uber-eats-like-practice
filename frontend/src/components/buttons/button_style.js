import styled from "styled-components";
import { COLORS, FONT_SIZE } from "../../style_constants";

export const BaseButton = styled.button`
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  :focus {
    outline: 0;
  }
`;
export const RoundButton = styled(BaseButton)`
  border-radius: 50%;
  width: 42px;
  height: 42px;
  border: none;
  background-color: ${COLORS.SUB_BUTTON};
`;
export const OrderButton = styled(BaseButton)`
  width: 390px;
  background-color: black;
  color: white;
  border-style: none;
  padding: 8px 16px;
  font-size: ${FONT_SIZE.BODY1};
`;
