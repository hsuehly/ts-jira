import { Button, Drawer } from "antd";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListAction,
  selectProjectModalOpen,
} from "./project-list.slice";

export const ProjectModal: FC = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  return (
    <Drawer
      visible={projectModalOpen}
      width="100%"
      onClose={() => dispatch(projectListAction.closeProjecModal())}
    >
      <h1>Project Modal</h1>
      <Button onClick={() => dispatch(projectListAction.closeProjecModal())}>
        关闭
      </Button>
    </Drawer>
  );
};
