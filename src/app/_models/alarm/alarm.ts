export interface Alarm {
    id: number
    type: string
    conditions: Conditions
    userId: string
  }
  
  export interface Conditions {
    id: number
    precip: number
    cloudcover: number
    temp: number
    uvIndex: number
    snow: number
    windspeed: number
    windgust: number
  }