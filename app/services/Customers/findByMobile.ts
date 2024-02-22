import axios from "axios";
import { APIURL } from "../../common/Constants";
import { ICustomer } from "./ICustomer";

const url = `${APIURL}/customers/mobile`;

export const findByMobile = async (payloads: {
  mobile: string;
}): Promise<ICustomer | null> => {
  const response = await axios.put(url, {
    mobile: payloads.mobile,
  });

  if (response.status === 204) {
    return null;
  }

  return response.data;
};
