import { Kanban } from "./kanban";

export type Epic = Kanban & {
  // 开始时间
  start: number;
  // 结束时间
  end: number;
};
