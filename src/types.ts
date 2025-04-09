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