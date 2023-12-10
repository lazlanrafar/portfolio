"use server";
import * as Wakatime from "@/types/wakatimeResponse";

export const weeklyCodingActivity = async () => {
  const res = await fetch(
    "https://wakatime.com/share/@lazlanrafar/536b5cda-34ff-4aad-8a2c-70d050806915.json",
    {
      cache: "no-store",
    }
  );
  return res.json() as Promise<Wakatime.WeeklyCodingActivity>;
};

export const weeklyCodingLanguages = async () => {
  const res = await fetch(
    "https://wakatime.com/share/@lazlanrafar/c5bdb772-6066-4334-bfe9-a551bb5a61e0.json",
    {
      cache: "no-store",
    }
  );
  return res.json() as Promise<Wakatime.WeeklyCodingLanguages>;
};
