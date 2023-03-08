import { ShowMessage } from "@components/message";
import { AppTable } from "@components/table";
import { Modal } from "antd";
import React, { useState } from "react";
import { useUsers } from "../logic/hook/user";
import { User } from "../logic/interface";
import { useDeleteUserMutation } from "../logic/service";
import { AddUser } from "./components/add-user";
import { ViewUser } from "./components/view-user";

const { confirm } = Modal;

export const SettingModule = () => {
  const [state, setState] = useState(false);
  const [delLoading, setLoading] = useState(false);
  const [viewState, setViewState] = useState(false);
  const [title, setTitle] = useState("New User");
  const [user, setUser] = useState<User | undefined>();

  const [delUser] = useDeleteUserMutation();

  const onOpen = () => {
    setState(true);
  };

  const onClose = () => {
    setState(false);
    setViewState(false);
    setUser(undefined);
    setTitle("New User");
  };

  const view = (row: User) => {
    setUser(row);
    setViewState(true);
  };

  const edit = (row: User) => {
    setUser(row);
    setState(true);
    setTitle("Edit User");
  };

  const showDeleteConfirm = (id: string, username: string) => {
    confirm({
      title: `Are you sure delete this user: ${username}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setLoading(true);

        delUser(id)
          .then((res: any) => {
            if (res.error) {
              const { data } = res.error;
              const { message } = data;
              ShowMessage("error", message);
              return;
            }

            ShowMessage("success", "User delete successfully !");
          })
          .finally(() => setLoading(false));
      },
      onCancel() {
        setUser(undefined);
      },
    });
  };

  const del = (row: User) => {
    setUser(row);
    showDeleteConfirm(row.id, row.username);
  };

  const { columns, rows, loading } = useUsers(view, edit, del);

  return (
    <div className="mx-auto container px-10 py-16">
      <div className="bg-white p-5">
        <div className="border-b flex justify-between px-3 py-5 items-center">
          <p className="text-xl font-bold">All Users</p>
          <button
            onClick={onOpen}
            className="border rounded-md px-6 py-2.5 bg-blue-500 text-white"
          >
            Add User
          </button>
        </div>
        <div>
          <AppTable
            key="id"
            columns={columns}
            rows={rows}
            loading={loading || delLoading ? true : false}
          />
        </div>
        <AddUser state={state} onClose={onClose} user={user} title={title} />
        <ViewUser state={viewState} onClose={onClose} user={user} />
      </div>
    </div>
  );
};
