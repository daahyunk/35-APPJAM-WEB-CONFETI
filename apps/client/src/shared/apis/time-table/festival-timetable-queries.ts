import { queryOptions } from '@tanstack/react-query';
import { getFestivalTimetables } from './festival-timetable';

export const FESTIVAL_TIMETABLE_QUERY_KEY = {
  ALL: ['festivalTimetables'],
} as const;

export const FESTIVAL_TIMETABLE_QUERY_OPTIONS = {
  GET: () =>
    queryOptions({
      queryKey: FESTIVAL_TIMETABLE_QUERY_KEY.ALL,
      queryFn: getFestivalTimetables,
    }),
};
