import styled from "@emotion/styled";
import { Typography, List, Popover, Divider } from "antd";
import { useDispatch } from "react-redux";
import { projectListAction } from "screens/project-list/project-list.slice";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = () => {
  const dispatch = useDispatch();
  const { data: projects } = useProjects();
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
        onClick={() => dispatch(projectListAction.openProjectModal())}
        type="link"
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
