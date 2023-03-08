import { ShowMessage } from "@components/message";
import { AppTable } from "@components/table";
import { Modal } from "antd";
import React, { useState } from "react";
import { useRoles } from "../logic/hook/role";
import { Role } from "../logic/interface";
import { useDeleteRoleMutation } from "../logic/service";
import { AddRole } from "./components/add-role";
import { ViewPermissions } from "./components/permission";

const { confirm } = Modal;

export const SettingRoleModule = () => {
  const [state, setState] = useState(false);
  const [delLoading, setLoading] = useState(false);
  const [viewState, setViewState] = useState(false);
  const [title, setTitle] = useState("New User");
  const [role, setRole] = useState<Role | undefined>();

  const [delUser] = useDeleteRoleMutation();

  const onOpen = () => {
    setState(true);
  };

  const onClose = () => {
    setState(false);
    setViewState(false);
    setRole(undefined);
    setTitle("New Role");
  };

  const view = (row: Role) => {
    setRole(row);
    setViewState(true);
  };

  const edit = (row: Role) => {
    setRole(row);
    setState(true);
    setTitle("Edit Role");
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
              ShowMessage("error", "Can't delete this role user depend on it");
              return;
            }

            ShowMessage("success", "User delete successfully !");
          })
          .finally(() => setLoading(false));
      },
      onCancel() {
        setRole(undefined);
      },
    });
  };

  const del = (row: Role) => {
    setRole(row);
    showDeleteConfirm(row.id, row.name);
  };

  const { columns, rows, loading } = useRoles(view, edit, del);

  return (
    <div className="mx-auto container px-10 py-16">
      <div className="bg-white p-5">
        <div className="border-b flex justify-between px-3 py-5 items-center">
          <p className="text-xl font-semibold">All Role</p>
          <button
            onClick={onOpen}
            className="border rounded-md px-6 py-2.5 bg-blue-500 text-white"
          >
            Add Role
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
        <AddRole state={state} onClose={onClose} role={role} title={title} />
        <ViewPermissions open={viewState} onClose={onClose} role={role} />
      </div>
    </div>
  );
};
