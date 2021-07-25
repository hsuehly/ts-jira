import React, { Component } from "react";

// interface IProps {
//   children: ReactNode
//   error: Error | null
// }
interface IProps {
  fallbackRender: FallbackRender;
}
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
interface IState {
  error: Error | null;
}
// https://github.com/bvaughn/react-error-boundary 错误处理的库
export class ErrorBoundary extends Component<
  React.PropsWithChildren<IProps>,
  IState
> {
  state = {
    error: null,
  };
  // 当子组件抛出异常，这里会接收到并且调用
  static getDevivedStateFromError(error: Error): Error {
    return error;
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
