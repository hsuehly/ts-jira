import { useState } from "react";
import { useDebounce, useDocumentTitle } from "utils/index";
import SearchPanel from "./search-panel";
import List from "./list";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectsSearchParams } from "./util";

const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  // 基本类型可以放在依赖里,组件状态可以放在依赖里,非组件状态的对象绝不可以放在依赖里
  // const [keys] = useState<('name' | 'personId')[]>(['name','personId'])
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  // setParam({name1:'ss'})

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};
export default ProjectListScreen;
ProjectListScreen.whyDidYouRender = false;
const Container = styled.div`
  padding: 3.2rem;
`;
