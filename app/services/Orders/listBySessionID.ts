import axios from "axios";
import { APIURL } from "../../common/Constants";
import { IOrder } from "./IOrder";

const url = `${APIURL}/orders/list`;

export const listBySessionID = async (payloads: {
  sessionID: string;
}) => {
  const response = await axios.put(url, payloads);
  let data: IOrder[] = response.data;

  data = data.map((each) => {
    each.createdAt = new Date(each.createdAt);

    return each;
  });

  return data;
};
