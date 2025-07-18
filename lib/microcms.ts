"use server";

import { IMicrocmsProject, IMicrocmsResponse } from "@/types/microcms-response";
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.MICROCMS_URL,
  headers: {
    "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
  },
});

export const getMicrocmsProjects = async () => {
  return await axiosInstance({
    method: "GET",
    url: "/project",
    params: {
      limit: 100,
    },
  }).then((res) => res.data as IMicrocmsResponse<IMicrocmsProject>);
};
