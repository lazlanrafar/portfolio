// Improved Wakatime/Activity types with better naming
export interface ActivityGrandTotal {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  text: string;
  totalSeconds: number;
}

export interface ActivityRange {
  date: string;
  end: string;
  start: string;
  text: string;
  timezone: string;
}

export interface ActivityDataPoint {
  grandTotal: ActivityGrandTotal;
  range: ActivityRange;
}

export interface ActivityStatItem {
  name: string;
  percent: number;
  color: string;
}

// Main activity interfaces
export interface CodingActivityResponse {
  data: ActivityDataPoint[];
}

export interface CodingLanguagesResponse {
  data: ActivityStatItem[];
}

export interface CodeEditorsResponse {
  data: ActivityStatItem[];
}

export interface OperatingSystemsResponse {
  data: ActivityStatItem[];
}

// Weekly activity specific types
export interface WeeklyActivityParams {
  range?: "last_7_days" | "last_30_days" | "last_6_months" | "last_year";
}

export interface ActivityMetrics {
  totalCodingTime: ActivityGrandTotal;
  topLanguages: ActivityStatItem[];
  topEditors: ActivityStatItem[];
  topOperatingSystems: ActivityStatItem[];
  weeklyData: ActivityDataPoint[];
}
