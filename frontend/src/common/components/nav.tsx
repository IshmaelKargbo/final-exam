import { Button, Dropdown, MenuProps } from "antd";
import Link from "next/link";
import { BsDatabaseDown, BsFiletypeCsv } from "react-icons/bs";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

export const Nav = () => {
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
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <nav className="bg-white border-b justify-between items-center flex p-5">
      <div>
        <Link href="/">
          Final Exam
        </Link>
      </div>
      <div className="flex space-x-3">
        <div className="flex space-x-3">
          <Button>
            <BsDatabaseDown className="text-base" />
          </Button>
          <Button>
            <BsFiletypeCsv className="text-base" />
          </Button>
        </div>
        <div>
          <Dropdown.Button
            menu={menuProps}
            placement="bottom"
            icon={<UserOutlined />}
          >
            Dropdown
          </Dropdown.Button>
        </div>
      </div>
    </nav>
  );
};
