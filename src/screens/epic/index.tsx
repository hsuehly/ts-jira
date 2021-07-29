import { Button, List, Modal } from "antd";
import { Row, ScreenContainer } from "components/lib";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProjectInUrl } from "screens/kanban/util";
import { Epic } from "types/epic";

import { useDeleteEpic, useEpics } from "utils/epic";
import { useTasks } from "utils/task";
import { CreateEpic } from "./create-epic";
import { useEpicSearchParams, useEpicsQueryKey } from "./util";

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  // 删除hook'
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);
  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组：${epic.name}`,
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button onClick={() => setEpicCreateOpen(true)} type="link">
          创建任务组
        </Button>
      </Row>
      <List
        dataSource={epics}
        style={{ overflow: "scroll" }}
        itemLayout="vertical"
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button type="link" onClick={() => confirmDeleteEpic(epic)}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间:{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间:{dayjs(epic.end).format("YYYY-MM-DD")} </div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    key={task.id}
                    to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </ScreenContainer>
  );
};
