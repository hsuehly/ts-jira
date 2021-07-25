import { createContext, useState, useContext, ReactNode } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";

interface AuthForm {
  username: string;
  password: string;
}
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();

  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (from: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // 页面加载是调用函数初始化setUSer
  useMount(() => {
    bootstrapUser().then(setUser);
  });
  // point free 形参和接受的参数一样可以消掉
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then((user) => setUser(null));
  //调用它把自身返回出去
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};
// 自定义 useAuthhook
export const useAuth = () => {
  const context = useContext(AuthContext);
  //判断context寸不存在
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
