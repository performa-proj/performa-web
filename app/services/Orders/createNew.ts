import axios from "axios";
import { APIURL } from "../../common/Constants";
import { IOrder } from "./IOrder";

const url = `${APIURL}/orders`;

export const createNew = async (payloads: IOrder) => {
  const response = await axios.post(url, payloads);

  return response.data;
};
