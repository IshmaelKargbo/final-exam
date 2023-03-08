import { Popover } from "antd";
import { ColumnType } from "antd/es/table";
import { useUserFindQuery } from "../service";
import { FiEdit, FiEye, FiMoreVertical, FiTrash } from "react-icons/fi";
import { User } from "../interface";

export const useListUser = () => {
  const { data: res, isLoading: loading, error } = useUserFindQuery();
  const rows: any = res || [];

  return { loading, rows, error };
};

export const useUsers = (
  view = (user: User) => {},
  edit = (user: User) => {},
  del = (user: User) => {}
) => {
  const { rows, loading, error } = useListUser();

  const Action = (
    row: User,
    view = (user: User) => {},
    edit = (user: User) => {},
    del = (user: User) => {}
  ) => {
    const content = (
      <div>
        <button
          onClick={() => view(row)}
          className="flex space-x-5 border-b w-full py-1 px-2 hover:bg-blue-500 hover:bg-opacity-90 hover:text-white"
        >
          <FiEye className="mt-1" /> <span>View</span>
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
      title: "First Name",
      dataIndex: "firstName",
      width: 200,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      width: 200,
    },
    { dataIndex: "email", title: "Email", width: 200 },
    {
      dataIndex: "username",
      title: "Username",
      width: 200,
    },
    {
      dataIndex: "state",
      title: "Status",
      width: 200,
    },
    {
      align: "right",
      width: 50,
      render: (row: User) => Action(row, view, edit, del),
    },
  ];

  return {
    columns,
    rows,
    loading,
    error,
  };
};
