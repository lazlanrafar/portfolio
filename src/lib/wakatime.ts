"use server";
import { WAKATIME } from "@/constants";
import * as Wakatime from "@/types/wakatimeResponse";

export const wakatimeWeeklyCodingActivity = async () => {
  const res = await fetch(WAKATIME.codingActivity);
  return res.json() as Promise<Wakatime.IWakatimeCodingActivity>;
};

export const wakatimeCodingLanguages = async () => {
  const res = await fetch(WAKATIME.codingLanguages);
  return res.json() as Promise<Wakatime.IWakatimeCodingLanguages>;
};

export const wakatimeCodeEditor = async () => {
  const res = await fetch(WAKATIME.codeEditor);
  return res.json() as Promise<Wakatime.IWakatimeCodeEditor>;
};

export const wakatimeOperatingSystems = async () => {
  const res = await fetch(WAKATIME.operatingSystems);
  return res.json() as Promise<Wakatime.IWakatimeOperatingSystems>;
};
