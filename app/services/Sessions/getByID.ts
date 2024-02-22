import axios from "axios";
import { APIURL } from "../../common/Constants";

const url = `${APIURL}/sessions`;

export const getByID = async (payloads: {
  id: string;
}) => {
  const response = await axios.put(url, payloads);
  const item = response.data;

  return item;
};
