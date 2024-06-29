import { format } from "date-fns";

export const truncateString = (str: string, max: number) => {
  return str?.length > max || 0 ? str?.slice(0, max) + "..." : str;
};

export const dateFormat = (date?: string) =>
  format(date || new Date(), "dd MMMM yyyy");
