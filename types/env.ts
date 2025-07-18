declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Site Configuration
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_API_URL: string;

      //   Analytics
      NEXT_PUBLIC_GA_ID: string;

      //   MicroCMS Configuration
      MICROCMS_URL: string;
      MICROCMS_API_KEY: string;

      //   Optional: Google Site Verification
      NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?: string;

      //   Optional: Additional Analytics
      NEXT_PUBLIC_VERCEL_ANALYTICS_ID?: string;
    }
  }
}

export {};
