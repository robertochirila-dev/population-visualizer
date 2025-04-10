export interface Country {
  _id: string;
  Country: string;
  Population: number;
}

export interface YearData {
  Year: number;
  Countries: Country[];
}

export interface PopulationData extends Array<YearData> {}

export interface PaginationProps {
  currentYear: number;
  years: number[];
  onYearChange: (year: number) => void;
}

export interface BarChartProps {
  countries: Country[];
  year: number;
  displayCount?: number;
} 