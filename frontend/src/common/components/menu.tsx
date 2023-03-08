import Link from "next/link";
import { RiDashboardLine } from "react-icons/ri";
import { BsDatabaseCheck } from "react-icons/bs";
import { FaSignOutAlt, FaUserLock } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
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
    <menu className="bg-white p-5 py-8 h-full items-center flex flex-col justify-between">
      <ul className="text-gray-500 pt-5">
        <li>
          <MenuLink href="/">
            <RiDashboardLine className="text-2xl" />
          </MenuLink>
        </li>
        <li>
          <MenuLink href="/vaccination">
            <BsDatabaseCheck className="text-2xl" />
          </MenuLink>
        </li>
        <li>
          <MenuLink href="/role">
            <FaUserLock className="text-2xl" />
          </MenuLink>
        </li>
        <li>
          <MenuLink href="/user">
            <MdOutlineSettings className="text-2xl" />
          </MenuLink>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/">
            <FaSignOutAlt className="text-2xl" />
          </Link>
        </li>
      </ul>
    </menu>
  );
};
