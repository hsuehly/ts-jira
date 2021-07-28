import { Project } from "./project";

export type Kanban = Pick<Project, "id" | "name"> & {
  projectId: number;
};
