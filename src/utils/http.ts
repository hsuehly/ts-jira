import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-contex";
interface Config extends RequestInit {
  data?: object;
  token?: string;
}

const apiUrl = "http://localhost:3001";

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    //转为查询字符串
    endpoint += `?${qs.stringify(data)}`;
  } else {
    // 解析成json格式
    config.body = JSON.stringify(data || {});
  }
  //axios 和fetch的表现不一样. axios可以直接在返回状态为2xx的时候抛出异常
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};
// js 中的typeof 是在运行中运行的
// ts的typeof 是在静态环境中运行的
export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// const say  = (name: string, age: number): string => {

//   console.log(name,age)
//   return name
// }

// type Per = Parameters< typeof say>

// const obj: Per = ['sdd',4]

// interface Person {
//   name: string;
//   age: number
// }

// const xiaoming: Partial<Person> = {
// age: 90
// }
// const shenmiren: Omit<Person,"age" | 'name'> = {

// }
// type Perkey = keyof Person
