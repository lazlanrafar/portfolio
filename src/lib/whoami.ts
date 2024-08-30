"use server";

import { Project } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_WHOAMI_URL;

export const whoamiFetchProjects = async ({
  page_size = 20,
}: {
  page_size?: number;
}) => {
  const res = await fetch(
    `${baseUrl}/project?email=lazlanrafar@gmail.com&page=1&page_size=${page_size}`
  );
  return res.json() as Promise<{
    status: number;
    message: string;
    data: Project[];
    pagination: {
      page: number;
      page_size: number;
      total_items: number;
      total_pages: number;
    };
  }>;
};
