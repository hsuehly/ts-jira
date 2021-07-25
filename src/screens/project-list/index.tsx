import { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "utils/index";
import SearchPanel from "./search-panel";
import List from "./list";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "utils/use-async";

const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<null | Error>(null)
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  // const [list, setList] = useState([]);
  const client = useHttp();
  const { run, isIdle, error } = useAsync();

  useEffect(() => {
    setIsLoading(true);
    client("projects", { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch((err) => {
        setError(err);
        setList([]);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);
  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list} users={users} />
    </Container>
  );
};
export default ProjectListScreen;

const Container = styled.div`
  padding: 3.2rem;
`;
