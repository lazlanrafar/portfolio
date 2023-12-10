"use server";

import { IWhoamiProjectResponse } from "@/types/whoamiResponse";
import { ENV } from "./env";

const baseUrl = ENV.NEXT_PUBLIC_WHOAMI_URL;

export const whoamiAssets = (path?: string) => {
  return path ? `${ENV.NEXT_PUBLIC_WHOAMI_ASSETS_URL}/${path}` : "";
};

export const fetchProjects = async () => {
  const res = await fetch(`${baseUrl}/projects?limit=16`, {
    cache: "no-store",
  });
  return res.json() as Promise<IWhoamiProjectResponse>;
};
