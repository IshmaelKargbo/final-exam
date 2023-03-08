import { Popover } from "antd";
import { ColumnType } from "antd/es/table";
import { FiEdit, FiMoreVertical, FiTrash } from "react-icons/fi";
import { MdOutlineLockPerson } from "react-icons/md";
import { useRoleFindQuery } from "../service";

export const useListRole = () => {
  const { data: res, isLoading: loading, error } = useRoleFindQuery();
  const rows: any = res || [];

  return { loading, rows, error };
};

export const useRoles = (
  view = (role: any) => {},
  edit = (role: any) => {},
  del = (role: any) => {}
) => {
  const { rows, loading, error } = useListRole();
  const Action = (
    row: any,
    view = (role: any) => {},
    edit = (role: any) => {},
    del = (role: any) => {}
  ) => {
    const content = (
      <div>
        <button
          onClick={() => view(row)}
          className="flex space-x-5 border-b w-full py-1 px-2 hover:bg-blue-500 hover:bg-opacity-90 hover:text-white"
        >
          <MdOutlineLockPerson className="mt-1" /> <span>Permissions</span>
        </button>
        <button
          onClick={() => edit(row)}
          className="flex space-x-5 border-b w-full py-1 px-2 hover:bg-blue-500 hover:bg-opacity-90 hover:text-white"
        >
          <FiEdit className="mt-1" /> <span>Edit</span>
        </button>
        <button
          onClick={() => del(row)}
          className="flex space-x-5 w-full py-1 px-2 hover:bg-blue-500 hover:bg-opacity-90 hover:text-white"
        >
          <FiTrash className="mt-1" /> <span>Delete</span>
        </button>
      </div>
    );

    return (
      <Popover content={content} trigger="hover">
        <button>
          <FiMoreVertical className="text-xl" />
        </button>
      </Popover>
    );
  };

  const columns: ColumnType<any>[] = [
    {
      title: "Name",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "Permission",
      dataIndex: "permissions",
      width: 200,
      render: (value) => value.length,
    },
    {
      align: "right",
      width: 50,
      render: (row: any) => Action(row, view, edit, del),
    },
  ];

  return {
    columns,
    rows,
    loading,
    error,
  };
};
