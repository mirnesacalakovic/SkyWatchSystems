export interface AutocompleteApiResponse {
  results: AutocompleteResult[];
}

export interface AutocompleteResult {
  country: string;
  country_code: string;
  state?: string;
  county: string;
  city: string;
  municipality?: string;
  postcode?: string;
  datasource: Datasource;
  lon: number;
  lat: number;
  population?: number;
  result_type: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  category: string;
  timezone: Timezone;
  plus_code: string;
  plus_code_short?: string;
  rank: Rank;
  place_id: string;
  district?: string;
}

export interface Datasource {
  sourcename: string;
  attribution: string;
  license: string;
  url: string;
}

export interface Timezone {
  name: string;
  offset_STD: string;
  offset_STD_seconds: number;
  offset_DST: string;
  offset_DST_seconds: number;
  abbreviation_STD: string;
  abbreviation_DST: string;
}

export interface Rank {
  confidence: number;
  confidence_city_level: number;
  match_type: string;
}
