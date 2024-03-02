import * as dateFns from 'date-fns';

export enum AddTimeTypes {
  Year = 'years',
  Month = 'months',
  Week = 'weeks',
  Day = 'days',
  Hour = 'hours',
  Minute = 'minutes',
  Second = 'seconds',
}

type AddTimeParams = {
  type: AddTimeTypes;
  value: number;
};

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_WEEK = 7 * ONE_DAY;
const ONE_MONTH = 30 * ONE_WEEK;
const ONE_YEAR = 12 * ONE_MONTH;

const multiplicationsMap = {
  [AddTimeTypes.Second]: ONE_SECOND,
  [AddTimeTypes.Minute]: ONE_MINUTE,
  [AddTimeTypes.Hour]: ONE_HOUR,
  [AddTimeTypes.Day]: ONE_DAY,
  [AddTimeTypes.Week]: ONE_WEEK,
  [AddTimeTypes.Month]: ONE_MONTH,
  [AddTimeTypes.Year]: ONE_YEAR,
};

export const getTimeStamp = ({ type, value }: AddTimeParams): number => multiplicationsMap[type] * value;

export const addTime = (ts: Date | number, duration: Duration): Date => dateFns.add(ts, duration);
export const isDateBefore = (date: number | Date, target: number | Date) => dateFns.isBefore(date, target);
