import { useAuth } from "context/auth-contex";
import { FC, ReactElement } from "react";
import { Form, Input } from "antd";
import { Lonbutton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";
interface IProps {
  onError: (error: Error) => void;
}
const RegisterScreen: FC<IProps> = ({ onError }): ReactElement => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    try {
      await run(register(values));
    } catch (error: any) {
      onError(error);
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
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder="确认密码" type="password" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <Lonbutton htmlType="submit" type="primary" loading={isLoading}>
          注册
        </Lonbutton>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
