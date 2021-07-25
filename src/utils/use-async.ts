import { useState } from "react";

interface State<T> {
  error: Error | null;
  data: T | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};
const defaultCOnfig = {
  throwOnError: false,
};

export const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultCOnfig
) => {
  const config = { ...defaultCOnfig, initialConfig };
  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState,
  });
  const setData = (data: T) =>
    setState({
      data,
      stat: "success",
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      error,
      data: null,
      stat: "error",
    });
  // run 用来出发异步请求
  const run = (promise: Promise<T>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        // catch 会消化异常 如果不主动抛出外边是接受不到异常
        setError(error);
        if (config.throwOnError) return Promise.reject(error);
        return error;
      });
  };
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
