import { ReactNode } from "react";
import { Menu } from "./menu";
import { Nav } from "./nav";

interface props {
  children: ReactNode;
}

export const Layout = ({ children }: props) => {
  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <main className="flex flex-1 overflow-y-auto">
        <div className="w-20 h-full border-r">
          <Menu />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};
