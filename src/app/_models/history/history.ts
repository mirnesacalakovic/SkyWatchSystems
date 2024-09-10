export interface History {
  queryCost: number
  latitude: number
  longitude: number
  resolvedAddress: string
  address: string
  timezone: string
  tzoffset: number
  days: Day[]
  stations: Stations
}

export interface Day {
  datetime: string
  datetimeEpoch: number
  tempmax: number
  tempmin: number
  temp: number
  feelslikemax: number
  feelslikemin: number
  feelslike: number
  dew: number
  humidity: number
  precip: number
  precipprob: number
  precipcover: number
  preciptype: any
  snow: any
  snowdepth: any
  windgust: any
  windspeed: number
  winddir: number
  pressure: number
  cloudcover: number
  visibility: number
  solarradiation: number
  solarenergy: number
  uvindex: number
  sunrise: string
  sunriseEpoch: number
  sunset: string
  sunsetEpoch: number
  moonphase: number
  conditions: string
  description: string
  icon: string
  stations: string[]
  source: string
  normal: Normal
}

export interface Normal {
  tempmax: number[]
  tempmin: number[]
  feelslike: number[]
  precip: number[]
  humidity: number[]
  snowdepth: any[]
  windspeed: number[]
  windgust: any[]
  winddir: number[]
  cloudcover: number[]
}

export interface Stations {
  BKPR: Bkpr
  D3068: D3068
  "13378099999": N13378099999
  "13376099999": N13376099999
  LYKV: Lykv
  "13369099999": N13369099999
  "13481199999": N13481199999
}

export interface Bkpr {
  distance: number
  latitude: number
  longitude: number
  useCount: number
  id: string
  name: string
  quality: number
  contribution: number
}

export interface D3068 {
  distance: number
  latitude: number
  longitude: number
  useCount: number
  id: string
  name: string
  quality: number
  contribution: number
}

export interface N13378099999 {
  distance: number
  latitude: number
  longitude: number
  useCount: number
  id: string
  name: string
  quality: number
  contribution: number
}

export interface N13376099999 {
  distance: number
  latitude: number
  longitude: number
  useCount: number
  id: string
  name: string
  quality: number
  contribution: number
}

export interface Lykv {
  distance: number
  latitude: number
  longitude: number
  useCount: number
  id: string
  name: string
  quality: number
  contribution: number
}

export interface N13369099999 {
  distance: number
  latitude: number
  longitude: number
  useCount: number
  id: string
  name: string
  quality: number
  contribution: number
}

export interface N13481199999 {
  distance: number
  latitude: number
  longitude: number
  useCount: number
  id: string
  name: string
  quality: number
  contribution: number
}
