import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// components
import { LocalMallIcon, QueryBuilderIcon } from "./icons";

const LineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 380px;
  margin: 0 auto;
`;
const StateText = styled.p`
  font-size: 15px;
  margin: 10px 0;
`;

const TitleText = styled.p`
  font-size: 15px;
  margin: 10px 0;
`;

export const OrderDetailItem = ({
  restaurantId,
  restaurantName,
  timeRequiered,
  count,
  amount,
  shippingFee
}) => (
  <>
    <LineWrapper>
      <LocalMallIcon />
      <Link to={`/restaurants/${restaurantId}/foods`}>{restaurantName}</Link>
    </LineWrapper>
    <LineWrapper>
      <QueryBuilderIcon />
      <StateText>{timeRequiered}分で到着予定</StateText>
    </LineWrapper>
    <LineWrapper>
      <TitleText>商品数</TitleText>
      <StateText>{count}</StateText>
    </LineWrapper>
    <LineWrapper>
      <TitleText>商品合計</TitleText>
      <StateText>¥{amount}</StateText>
    </LineWrapper>
    <LineWrapper>
      <TitleText>配送料</TitleText>
      <StateText>¥{shippingFee}</StateText>
    </LineWrapper>
    <LineWrapper>
      <TitleText>合計</TitleText>
      <StateText>¥{amount + shippingFee}</StateText>
    </LineWrapper>
  </>
);
