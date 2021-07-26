import { Button, Drawer } from "antd";
import { FC } from "react";

interface ModalProps {
  projectModalOpen: boolean;
  onClose: () => void;
}
export const ProjectModal: FC<ModalProps> = (props) => {
  return (
    <Drawer visible={props.projectModalOpen} width="100%">
      <h1>Project Modal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
