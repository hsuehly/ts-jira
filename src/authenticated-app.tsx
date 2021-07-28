/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, ReactElement } from "react";
import { useAuth } from "context/auth-contex";
import ProjectListScreen from "screens/project-list";
import styled from "@emotion/styled";
import { Dropdown, Menu, Button } from "antd";
import { ButtonNoPadding, Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Route, Routes, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectPopover } from "components/project-popover";
import { ProjectModal } from "screens/project-list/project-modal";

/**
 * grid 和 flex 各自的应用场景
 * 1.要考虑,是一维布局 还是 二维布局
 * 一般来说, 一维布局用用flex 二维用grid
 * 2. 是从内容出发还是从布局出发?
 * 从内容出发: 你现有一组内容(数量一般不固定), 然后希望他们均匀分布在容器里,由内容自己的大小决定占据的空间
 * 从布局出发: 先规划网格 (数量一般比较固定), 然后再把元素往里填充
 * 从内容出发用flex
 * 从布局出发 用grid
 */

export const AuthenticatedApp: FC = (): ReactElement => {
  return (
    <Container>
      <BrowserRouter>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to="/projects" />
          </Routes>
        </Main>
        <ProjectModal />
      </BrowserRouter>
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftwareLogo width="18rem" color="rgb(38,132,255)" />
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};
const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type="link" onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
// const PageHander = styled.header`
// background-color: gray;
// height: 6rem;
// `
const Main = styled.main`
  height: calc(100vh - 6rem);
`;
