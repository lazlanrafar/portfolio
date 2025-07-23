import type {
  CodingActivityResponse,
  CodingLanguagesResponse,
  CodeEditorsResponse,
  OperatingSystemsResponse,
  ActivityMetrics,
  WeeklyActivityParams,
} from "@/types/activity";

// Wakatime public share URLs
const baseUrl = "https://wakatime.com/share/@lazlanrafar";

export const WAKATIME = {
  codingActivity: baseUrl + "/536b5cda-34ff-4aad-8a2c-70d050806915.json",
  codingLanguages: baseUrl + "/c5bdb772-6066-4334-bfe9-a551bb5a61e0.json",
  codeEditor: baseUrl + "/38c7408d-c558-4e8f-96ad-9cdb052082ee.json",
  operatingSystems: baseUrl + "/c7d5cffa-f1d9-461e-8fae-3560ad57a97a.json",
};

/**
 * Generic function to fetch data from Wakatime public share URLs
 */
async function fetchWakatimeData<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(
      `Wakatime share URL call failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Fetches weekly coding activity data
 */
export async function getCodingActivity(
  params: WeeklyActivityParams = {}
): Promise<CodingActivityResponse> {
  const rawData = await fetchWakatimeData<any>(WAKATIME.codingActivity);

  // Transform the API response to match our TypeScript types
  const transformedData = {
    ...rawData,
    data: rawData.data.map((item: any) => ({
      range: item.range,
      grandTotal: {
        ...item.grand_total,
        totalSeconds: item.grand_total.total_seconds,
      },
    })),
  };

  return transformedData as CodingActivityResponse;
}

/**
 * Fetches programming languages statistics
 */
export async function getCodingLanguages(
  params: WeeklyActivityParams = {}
): Promise<CodingLanguagesResponse> {
  return fetchWakatimeData<CodingLanguagesResponse>(WAKATIME.codingLanguages);
}

/**
 * Fetches code editors statistics
 */
export async function getCodeEditors(
  params: WeeklyActivityParams = {}
): Promise<CodeEditorsResponse> {
  return fetchWakatimeData<CodeEditorsResponse>(WAKATIME.codeEditor);
}

/**
 * Fetches operating systems statistics
 */
export async function getOperatingSystems(
  params: WeeklyActivityParams = {}
): Promise<OperatingSystemsResponse> {
  return fetchWakatimeData<OperatingSystemsResponse>(WAKATIME.operatingSystems);
}

/**
 * Fetches comprehensive activity metrics in a single call
 */
export async function getActivityMetrics(
  params: WeeklyActivityParams = {}
): Promise<ActivityMetrics> {
  const { range = "last_7_days" } = params;

  try {
    const [activityData, languages, editors, operatingSystems] =
      await Promise.all([
        getCodingActivity(params),
        getCodingLanguages(params),
        getCodeEditors(params),
        getOperatingSystems(params),
      ]);

    // Extract the most recent total coding time
    const latestActivity = activityData.data[0];

    return {
      totalCodingTime: latestActivity?.grandTotal || {
        decimal: "0.0",
        digital: "0:00",
        hours: 0,
        minutes: 0,
        text: "0 mins",
        totalSeconds: 0,
      },
      topLanguages: languages.data || [],
      topEditors: editors.data || [],
      topOperatingSystems: operatingSystems.data || [],
      weeklyData: activityData.data || [],
    };
  } catch (error) {
    console.error("Error fetching activity metrics:", error);
    throw error;
  }
}

/**
 * Fetches last 7 days coding activity
 */
export async function getWeeklyActivity(): Promise<CodingActivityResponse> {
  return getCodingActivity({ range: "last_7_days" });
}

/**
 * Fetches last 30 days coding activity
 */
export async function getMonthlyActivity(): Promise<CodingActivityResponse> {
  return getCodingActivity({ range: "last_30_days" });
}

/**
 * Fetches last 6 months coding activity
 */
export async function getSixMonthActivity(): Promise<CodingActivityResponse> {
  return getCodingActivity({ range: "last_6_months" });
}

/**
 * Fetches yearly coding activity
 */
export async function getYearlyActivity(): Promise<CodingActivityResponse> {
  return getCodingActivity({ range: "last_year" });
}
