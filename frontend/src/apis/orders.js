import axios from "axios";
import { lineFoods, orders } from "../urls/index";

export const fetchOrder = () => {
  return axios
    .get(lineFoods)
    .then(res => {
      return res.data;
    })
    .catch(e => {
      throw e;
    });
};

export const postOrder = params => {
  return axios
    .post(orders, { line_food_ids: params.line_food_ids })
    .then(res => {
      return res.data;
    })
    .catch(e => {
      console.error(e);
    });
};
