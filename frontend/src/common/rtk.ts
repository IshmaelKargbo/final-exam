import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { BASE_URL } from "./config";

export const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" })