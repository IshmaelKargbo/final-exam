import { Button, Dropdown, MenuProps } from "antd";
import Link from "next/link";
import { BsDatabaseDown, BsFiletypeCsv } from "react-icons/bs";
import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { CSV_LINK } from "../config";
import { useMeQuery } from "@modules/setting/logic/service";
import { useLogoutMutation } from "@modules/login/logic/service";
import { ShowMessage } from "./message";
import Router from "next/router";

export const Nav = () => {
  const [logout] = useLogoutMutation();
  const { data: user } = useMeQuery();

  const downloadCSV = () => {
    window.open(CSV_LINK, "_blank");
  };

  const logoutUser = () => {
    logout().then((res: any) => {
      if (res.error) {
        const { data } = res.error;
        const { message } = data;
        ShowMessage("error", message);
        return;
      }
      Router.push("/login");
    });
  };

  const items: MenuProps["items"] = [
    {
      label: "Profile",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "Logout",
      key: "2",
      icon: <LogoutOutlined />,
      onClick: logoutUser,
    },
  ];

  return (
    <nav className="bg-white border-b justify-between items-center flex px-5 py-3">
      <div>
        <Link href="/" className="font-semibold">
          Final Exam
        </Link>
      </div>
      <div className="flex space-x-3">
        <div className="flex space-x-3">
          <Button>
            <BsDatabaseDown className="text-base" />
          </Button>
          <Button onClick={downloadCSV}>
            <BsFiletypeCsv className="text-base" />
          </Button>
        </div>
        <div>
          <Dropdown
            menu={{
              items,
            }}
          >
            <div className="flex border rounded-md px-2 py-1.5 space-x-3">
              <div className="flex space-x-2 items-center">
                <UserOutlined />
                <p className="text-sm">{`${user?.firstName} ${user?.lastName}`}</p>
              </div>
              <DownOutlined className="text-xs" />
            </div>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};
