import axios from "axios";
import { APIURL } from "../../common/Constants";
import { SessionDataType } from "./SessionDataType";

const url = `${APIURL}/sessions/list`;

export const listByStatus = async (payloads: {
  status: "OPENED" | "COMPLETED";
}) => {
  const response = await axios({
    url,
    method: "get",
    data: {
      status: payloads.status,
    },
  });
  const data: SessionDataType[] = response.data;

  return data;
};
