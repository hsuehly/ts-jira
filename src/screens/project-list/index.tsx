import { useDebounce, useDocumentTitle } from "utils/index";
import SearchPanel from "./search-panel";
import List from "./list";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import {
  ButtonNoPadding,
  ErrorBox,
  Row,
  ScreenContainer,
} from "components/lib";
import { Profiler } from "components/profiler";

const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const { open } = useProjectModal();
  // 基本类型可以放在依赖里,组件状态可以放在依赖里,非组件状态的对象绝不可以放在依赖里
  // const [keys] = useState<('name' | 'personId')[]>(['name','personId'])
  const [param, setParam] = useProjectsSearchParams();
  // console.log(param,'-------')
  // console.log(setParam())
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  // setParam({name1:'ss'})
  // console.log('----------',users)
  return (
    <Profiler id="项目列表">
      <ScreenContainer>
        <Row marginBottom={2} between={true}>
          <h1>项目列表</h1>
          <ButtonNoPadding onClick={open} type={"link"}>
            创建项目
          </ButtonNoPadding>
        </Row>

        <SearchPanel users={users || []} param={param} setParam={setParam} />
        <ErrorBox error={error} />
        <List loading={isLoading} dataSource={list || []} users={users || []} />
      </ScreenContainer>
    </Profiler>
  );
};
export default ProjectListScreen;
ProjectListScreen.whyDidYouRender = false;
