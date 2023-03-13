import axios from "axios";
import { BASE_URL } from "../config";

const UnAuthorize = {
  redirect: {
    permanent: false,
    destination: `/login`,
  },
};

const NoNetwork = {
  redirect: {
    permanent: false,
    destination: `/network`,
  },
};

const Home = {
  redirect: {
    permanent: false,
    destination: `/`,
  },
};

export const handleError = (err: any) => {
  const { response, code } = err;

  if (code === "ERR_NETWORK" && code === "ECONNREFUSED")
    throw { status: 307, data: "Network issue" };

  if (!response) throw err;

  const { status, data, statusText } = response;

  throw {
    status,
    data,
    statusText,
  };
};

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const ApiServer = {
  Me: async (req: any) => {
    const { cookie } = req.headers;

    if (!cookie) return UnAuthorize;

    const response = await api
      .get("/user/me", { headers: { cookie } })
      .catch(handleError)
      .catch((err: any) => err);

    if (response.status === 307) return NoNetwork;

    if (response.status === 403) return UnAuthorize;

    return {
      props: {},
    };
  },
  isLogin: async (req: any) => {
    const { cookie } = req.headers;

    if (!cookie) return UnAuthorize;

    const response = await api
      .get("/user/me", { headers: { cookie } })
      .catch(handleError)
      .catch((err: any) => err);

    if (response.status === 200) return Home;

    return {
      props: {},
    };
  },
};
