import { Drawer } from "antd";
import { ReactNode } from "react";

interface props {
  onClose: () => void;
  title?: string | undefined;
  open: boolean;
  children: ReactNode
}

export const AppDrawer = ({ onClose, open, title, children }: props) => {
  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      open={open}
      key={title}
    >
      {children}
    </Drawer>
  );
};
