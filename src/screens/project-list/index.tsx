import { useDebounce, useDocumentTitle } from "utils/index";
import SearchPanel from "./search-panel";
import List from "./list";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./util";
import { Row } from "components/lib";

const ProjectListScreen = (props: { prijectButton: JSX.Element }) => {
  useDocumentTitle("项目列表", false);
  // 基本类型可以放在依赖里,组件状态可以放在依赖里,非组件状态的对象绝不可以放在依赖里
  // const [keys] = useState<('name' | 'personId')[]>(['name','personId'])
  const [param, setParam] = useProjectsSearchParams();
  // console.log(param,'-------')
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  // setParam({name1:'ss'})
  // console.log('----------',users)

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {props.prijectButton}
      </Row>

      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
        prijectButton={props.prijectButton}
      />
    </Container>
  );
};
export default ProjectListScreen;
ProjectListScreen.whyDidYouRender = false;
const Container = styled.div`
  padding: 3.2rem;
`;
