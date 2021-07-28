import { useQuery } from "react-query";
import { TaaskType } from "types/task-type";
import { useHttp } from "./http";

export const useTaskTypes = (param?: Partial<TaaskType>) => {
  const client = useHttp();

  return useQuery<TaaskType[]>(["taskTypes", param], () => client("taskTypes"));
};
