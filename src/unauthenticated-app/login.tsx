import { useAuth } from "context/auth-contex";
import { FC, ReactElement } from "react";
import { Form, Input } from "antd";
import { Lonbutton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";
interface ILogoProps {
  onError(error: Error): void;
}
const Login: FC<ILogoProps> = ({ onError }): ReactElement => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e: any) {
      onError(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <Lonbutton htmlType="submit" type="primary" loading={isLoading}>
          登录
        </Lonbutton>
      </Form.Item>
    </Form>
  );
};

export default Login;
