import { authApi } from "@modules/login/logic/service";
import { roleApi, userApi } from "@modules/setting/logic/service";
import { vaccinationApi } from "@modules/vaccination/logic/vaccination.service";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [vaccinationApi.reducerPath]: vaccinationApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(vaccinationApi.middleware)
      .concat(userApi.middleware)
      .concat(roleApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
