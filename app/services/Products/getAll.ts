import axios from "axios";
import { APIURL } from "../../common/Constants";

const url = `${APIURL}/products`;

export const getAll = async () => {
  const response = await axios.get(url);

  if (response.status === 204) {
    return null;
  }

  return response.data;
};
