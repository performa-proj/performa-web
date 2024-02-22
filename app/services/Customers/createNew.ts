import axios from "axios";
import { APIURL } from "../../common/Constants";

const url = `${APIURL}/customers`;

export const createNew = async (payloads: {
  mobile: string;
  name: string;
  level?: number;
  creditlimit?: number;
  creditperiod?: number;
}) => {
  const { mobile, name, level = 0, creditlimit = 0, creditperiod = 28 } = payloads;
  const response = await axios.post(url, {
    mobile,
    name,
    level,
    creditlimit,
    creditperiod,
  });

  return response.data;
};
