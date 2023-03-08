import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../common/rtk";
import { User } from "./interface";

export const userApi = createApi({
  reducerPath: "UserApi",
  baseQuery: baseQuery,
  tagTypes: ["users", "user"],
  endpoints: (builder) => ({
    userFind: builder.query<User[], void>({
      query: () => ({
        url: "/user",
      }),
      providesTags: ["users"],
    }),
    userFindOne: builder.query<User, string>({
      query: (id) => ({
        url: `/user/${id}`,
      }),
      providesTags: ["user"],
    }),
    createUser: builder.mutation<User, Partial<any>>({
      query: (body) => ({
        url: "user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["users"],
    }),
    editUser: builder.mutation<User, Partial<any>>({
      query: (body) => ({
        url: "user",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["users"],
    }),
    resetPassword: builder.mutation<User, string>({
      query: (id) => ({
        url: `/user/${id}/reset`,
        method: "PATCH",
      }),
    }),
    deleteUser: builder.mutation<User, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useUserFindOneQuery,
  useUserFindQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useResetPasswordMutation,
  useDeleteUserMutation
} = userApi;

export const roleApi = createApi({
  reducerPath: "RoleApi",
  baseQuery: baseQuery,
  tagTypes: ["roles", "role"],
  endpoints: (builder) => ({
    roleFind: builder.query<User[], void>({
      query: () => ({
        url: "/role",
      }),
      providesTags: ["roles"],
    }),
    roleFindOne: builder.query<User, string>({
      query: (id) => ({
        url: `/role/${id}`,
      }),
      providesTags: ["role"],
    }),
    createRole: builder.mutation<User, Partial<any>>({
      query: (body) => ({
        url: "user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["roles"],
    }),
  }),
});

export const { useRoleFindQuery, useRoleFindOneQuery, useCreateRoleMutation } =
  roleApi;
