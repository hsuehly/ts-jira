import { useAuth } from "context/auth-contex";
import { FC, ReactElement } from "react";
import { Form, Input } from "antd";
import { Lonbutton } from "unauthenticated-app";

const RegisterScreen: FC = (): ReactElement => {
  const { register } = useAuth();
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
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
        <Lonbutton htmlType="submit" type="primary">
          注册
        </Lonbutton>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
