import { AppDrawer } from "@components/drawer";
import { ErrorMessage } from "@components/error";
import { ShowMessage } from "@components/message";
import { Role } from "@modules/setting/logic/interface";
import {
  useCreateRoleMutation,
  useEditRoleMutation,
} from "@modules/setting/logic/service";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";

interface props {
  state: boolean;
  title?: string;
  role?: Role | undefined;
  onClose: () => void;
}

export const AddRole = ({ state, onClose, title, role }: props) => {
  const [form] = Form.useForm();
  const [lading, setLoading] = useState(false);
  const [error, setError] = useState<string | Array<string> | null>(null);

  const [addRole] = useCreateRoleMutation();
  const [editRole] = useEditRoleMutation();

  useEffect(() => {
    if (role) {
      form.setFieldValue("name", role.name);
    }
  }, [form, role]);

  const onFinish = (value: any) => {
    setLoading(true);

    if (role && role.id) {
      editRole({ ...role, ...value })
        .then((res: any) => {
          if (res.error) {
            const { data } = res.error;
            const { message } = data;
            setError(message);
            return;
          }

          ShowMessage("success", "Role edited successfully !");
        })
        .finally(() => setLoading(false));
    } else {
      addRole(value)
        .then((res: any) => {
          if (res.error) {
            const { data } = res.error;
            const { message } = data;
            setError(message);
            return;
          }

          ShowMessage("success", "Role created successfully !");
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
    <AppDrawer title={title || "New Role"} open={state} onClose={onCancel}>
      <Form
        name="addRole"
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
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input role name!" }]}
        >
          <Input placeholder="Name" size="large" />
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
