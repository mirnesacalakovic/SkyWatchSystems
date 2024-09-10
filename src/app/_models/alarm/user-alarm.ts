export interface UserAlarm {
  id: number;
  type: string;
  conditions: UserAlarmConditions;
  userId: string;
}

export interface CreateUserAlarm {
  type: string;
  conditions: UserAlarmConditions;
  userId: string;
}

export interface UserAlarmConditions {
  id: number;
  precip: number;
  cloudcover: number;
  temp: number;
  uvIndex: number;
  snow: number;
  windspeed: number;
  windgust: number;
}
