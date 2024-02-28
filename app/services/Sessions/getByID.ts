import axios from "axios";
import { APIURL } from "../../common/Constants";

const url = `${APIURL}/sessions/id`;

export const getByID = async (payloads: {
  id: string;
}) => {
  const response = await axios({
    url,
    method: "get",
    data: {
      id: payloads.id,
    },
  });

  if (response.status === 204) {
    return null;
  }

  return response.data;
};
