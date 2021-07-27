import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false,
};
export const projectListSlice = createSlice({
  name: "projectLIstSlice",
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true;
    },
    closeProjecModal(state) {
      state.projectModalOpen = false;
    },
  },
});
export const projectListAction = projectListSlice.actions;
export const selectProjectModalOpen = (state: RootState) =>
  state.projectList.projectModalOpen;
