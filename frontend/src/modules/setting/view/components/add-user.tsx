import { AppDrawer } from "@components/drawer";
import { ErrorMessage } from "@components/error";
import { ShowMessage } from "@components/message";
import { useListRole } from "@modules/setting/logic/hook/role";
import { User } from "@modules/setting/logic/interface";
import {
  useCreateUserMutation,
  useEditUserMutation,
} from "@modules/setting/logic/service";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";

interface props {
  state: boolean;
  title?: string;
  user?: User | undefined;
  onClose: () => void;
}

export const AddUser = ({ state, onClose, title, user }: props) => {
  const [form] = Form.useForm();
  const [lading, setLoading] = useState(false);
  const [error, setError] = useState<string | Array<string> | null>(null);

  const { rows: roles } = useListRole();
  const [addUser] = useCreateUserMutation();
  const [editUser] = useEditUserMutation();

  useEffect(() => {
    if (user) {
      form.setFieldValue("firstName", user.firstName);
      form.setFieldValue("lastName", user.lastName);
      form.setFieldValue("email", user.email);
      form.setFieldValue("username", user.username);
      form.setFieldValue("roleId", user.role.id);
    }
  }, [form, user]);

  const onFinish = (value: any) => {
    setLoading(true);

    if (user && user.id) {
      editUser({ ...value, id: user.id })
        .then((res: any) => {
          if (res.error) {
            const { data } = res.error;
            const { message } = data;
            setError(message);
            return;
          }

          ShowMessage("success", "User edited successfully !");
        })
        .finally(() => setLoading(false));
    } else {
      addUser(value)
        .then((res: any) => {
          if (res.error) {
            const { data } = res.error;
            const { message } = data;
            setError(message);
            return;
          }

          ShowMessage("success", "User created successfully !");
        })
        .finally(() => setLoading(false));
    }

    onCancel();
  };

  const onCancel = () => {
    form.resetFields();
    onClose();
  };

  const closeErrorFunc = (index: number) => {
    const data: any = error;
    const filter = data.filter((_: string, i: number) => i !== index);
    setError(filter);
  };

  return (
    <AppDrawer title={title || "New User"} open={state} onClose={onCancel}>
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
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input placeholder="First name" size="large" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input placeholder="Last name" size="large" />
        </Form.Item>
        <Form.Item
          label="Role"
          name="roleId"
          rules={[{ required: true, message: "Please enter outlet type!" }]}
        >
          <Select placeholder="Role" size="large">
            {roles.map((e: any) => (
              <Select.Option key={e.id} value={e.id}>
                {e.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: "email", message: "Please input a valid email!" },
            { required: true, message: "Please input your email!" },
          ]}
        >
          <Input placeholder="email" size="large" />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please input your username!" },
            { min: 4, message: "User shound have minimun of four character!" },
          ]}
        >
          <Input
            disabled={user && user.id ? true : false}
            placeholder="Username"
            size="large"
          />
        </Form.Item>

        <div className="border-t pt-5 mt-10 flex justify-end space-x-3">
          <Button size="large" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            loading={lading}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </div>
      </Form>
    </AppDrawer>
  );
};
