export interface IWakatimeCodingActivity {
  data: {
    grand_total: GrandTotal;
    range: Range;
  }[];
}

export interface IWakatimeCodingLanguages {
  data: {
    name: string;
    percent: number;
    color: string;
  }[];
}

export interface IWakatimeCodeEditor {
  data: {
    color: string;
    name: string;
    percent: number;
  }[];
}

export interface IWakatimeOperatingSystems {
  data: {
    color: string;
    name: string;
    percent: number;
  }[];
}

interface GrandTotal {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  text: string;
  total_seconds: number;
}

interface Range {
  date: string;
  end: string;
  start: string;
  text: string;
  timezone: string;
}
