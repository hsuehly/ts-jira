import { Button, Drawer } from "antd";
import { FC } from "react";
import { useProjectModal } from "./util";

export const ProjectModal: FC = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer visible={projectModalOpen} width="100%" onClose={close}>
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
