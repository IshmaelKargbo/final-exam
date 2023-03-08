import { User } from "@modules/setting/logic/interface";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../common/rtk";

export const authApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    Login: builder.mutation<User, string>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    Logout: builder.mutation<User, void>({
      query: () => ({
        url: "auth/logout",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
