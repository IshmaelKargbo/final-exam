import { RiDashboardLine } from "react-icons/ri";
import { BsDatabaseCheck } from "react-icons/bs";
import { FaUserLock, FaUsers } from "react-icons/fa";
import { NavLink } from "./link";
import { ReactNode } from "react";

interface props {
  href: string;
  children: ReactNode;
}

const MenuLink = ({ href, children }: props) => {
  return (
    <div className="mb-24">
      <NavLink
        href={href}
        className="hover:text-gray-500"
        activeClassName="text-blue-500"
      >
        {children}
      </NavLink>
    </div>
  );
};

export const Menu = () => {
  return (
    <menu className="bg-white p-5 py-8 h-full items-center">
      <ul className="text-gray-500 pt-5 flex flex-col justify-between h-full">
        <li>
          <MenuLink href="/">
            <RiDashboardLine className="text-2xl" />
          </MenuLink>
        </li>
        <li>
          <MenuLink href="/role">
            <FaUserLock className="text-2xl" />
          </MenuLink>
        </li>
        <li>
          <MenuLink href="/user">
            <FaUsers className="text-2xl" />
          </MenuLink>
        </li>
      </ul>
    </menu>
  );
};
