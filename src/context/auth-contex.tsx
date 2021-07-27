import { createContext, useContext, ReactNode, useCallback } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FUllPageErrorFallback, FullPageLoading } from "components/lib";
import * as authStore from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/auth.slice";

export interface AuthForm {
  username: string;
  password: string;
}
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();

  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// const AuthContext = createContext<
//   | {
//       user: User | null;
//       register: (form: AuthForm) => Promise<void>;
//       login: (from: AuthForm) => Promise<void>;
//       logout: () => Promise<void>;
//     }
//   | undefined
// >(undefined);

// AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    // setData: setUser,
  } = useAsync<User | null>();
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  // 页面加载是调用函数初始化setUSer
  // point free 形参和接受的参数一样可以消掉
  // const login = (form: AuthForm) => auth.login(form).then(setUser);
  // const register = (form: AuthForm) => auth.register(form).then(setUser);
  // const logout = () => auth.logout().then((user) => setUser(null));
  useMount(() => {
    // run(bootstrapUser());
    run(dispatch(authStore.bootstrap()));
  });
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FUllPageErrorFallback error={error} />;
  }
  //调用它把自身返回出去
  // return (
  //   <AuthContext.Provider
  //     children={children}
  //     value={{ user, login, register, logout }}
  //   />
  // );
  return <>{children}</>;
};
// 自定义 useAuthhook
export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
