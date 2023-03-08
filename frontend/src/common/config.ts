import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const BASE_URL = publicRuntimeConfig.backendUrl;

export const CSV_LINK = `${BASE_URL}/auth/csv`;