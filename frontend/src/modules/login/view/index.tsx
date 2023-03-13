import { ErrorMessage } from "@components/error";
import { ShowMessage } from "@components/message";
import { Button, Form, Input } from "antd";
import Router from "next/router";
import React, { useState } from "react";
import { useLoginMutation } from "../logic/service";

export const LoginModule = () => {
  const [form] = Form.useForm();
  const [lading, setLoading] = useState(false);
  const [error, setError] = useState<string | Array<string> | null>(null);

  const [login] = useLoginMutation();

  const closeErrorFunc = (index: number) => {
    const data: any = error;
    const filter = data.filter((_: string, i: number) => i !== index);
    setError(filter);
  };

  const onFinish = (value: any) => {
    setLoading(true);

    login(value).then((res: any) => {
      if (res.error) {
        const { data } = res.error;
        const { message } = data;
        setError(message);
        setLoading(false);
        return;
      }
      Router.push("/");
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-1/4 p-10 py-16">
        <div className="mb-10">
          <p className="text-4xl text-center font-bold">Final Exam</p>
        </div>
        <Form
          name="addUser"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
          form={form}
        >
          <ErrorMessage
            error={error}
            closeFunc={(state) => setError(state)}
            closeIndexFunc={(index) => closeErrorFunc(index)}
          />
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>
          <div className="mt-8 flex justify-end space-x-3">
            <Button
              loading={lading}
              size="large"
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
