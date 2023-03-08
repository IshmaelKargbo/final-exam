import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../common/rtk";
import { Vaccination } from "./vaccination.interface";

export const vaccinationApi = createApi({
  reducerPath: "VaccinationApi",
  baseQuery: baseQuery,
  tagTypes: ["vaccinations", "vaccination"],
  endpoints: (builder) => ({
    VaccinationFind: builder.query<Vaccination[], void>({
      query: () => ({
        url: "/vaccination",
      }),
      providesTags: ["vaccinations"],
    }),
    VaccinationFindOne: builder.query<Vaccination, string>({
      query: (id) => ({
        url: `/vaccination/${id}`,
      }),
      providesTags: ["vaccination"],
    }),
  }),
});

export const { useVaccinationFindOneQuery, useVaccinationFindQuery } = vaccinationApi;
