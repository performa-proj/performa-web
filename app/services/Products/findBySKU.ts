import axios from "axios";
import { APIURL } from "../../common/Constants";

const url = `${APIURL}/products/sku`;

export const findBySKU = async (payloads: {
  sku: string;
}) => {
  const response = await axios.put(url, {
    sku: payloads.sku,
  });

  if (response.status === 204) {
    return null;
  }

  return response.data;
};
