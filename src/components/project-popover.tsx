import styled from "@emotion/styled";
import { Typography, List, Popover, Divider } from "antd";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = (props: {
  setProjectModalOpen: (isOPen: boolean) => void;
}) => {
  const { data: projects, isLoading } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);
  // console.log(pinnedProjects)

  const content = (
    <ContentnContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        type="link"
        onClick={() => props.setProjectModalOpen(true)}
      >
        创建项目
      </ButtonNoPadding>
    </ContentnContainer>
  );
  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  );
};
const ContentnContainer = styled.div`
  min-width: 30rem;
`;
