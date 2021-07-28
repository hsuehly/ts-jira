import { Kanban } from "./kanban";

export type Task = Omit<Kanban, "personId"> & {
  //经办人
  processorId: number;
  projectId: number;
  // 任务组
  epicId: number;
  kanbanId: number;
  //bug or task
  typeId: number;
  note: string;
};
