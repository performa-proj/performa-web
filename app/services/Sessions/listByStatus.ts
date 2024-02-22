import axios from "axios";
import { APIURL } from "../../common/Constants";
import { ISession } from "./ISessions";

const url = `${APIURL}/sessions/list`;

export const listByStatus = async (payloads: {
  status: "OPENED";
}) => {
  const response = await axios.put(url, payloads);
  let data: ISession[] = response.data;
  data = data.map((each) => {
    each.createdAt = new Date(each.createdAt);

    return each;
  });

  return data;
};
