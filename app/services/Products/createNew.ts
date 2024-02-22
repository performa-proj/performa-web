import axios from "axios";
import { APIURL } from "../../common/Constants";

const url = `${APIURL}/products`;

export const createNew = async (payloads: {
  sku: string;
  title: string;
  weight: number;
  price: number;
}) => {
  const response = await axios.post(url, {
    sku: payloads.sku,
    title: payloads.title,
    weight: payloads.weight,
    price: payloads.price,
  });

  return response.data;
};
