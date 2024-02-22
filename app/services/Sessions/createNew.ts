import axios from "axios";
import { APIURL } from "../../common/Constants";

const url = `${APIURL}/sessions`;

export const createNew = async (payloads: {
  initialCash: number;
}) => {
  const response = await axios.post(url, payloads);
  const item = response.data;

  return item;
};
