import { Drawer } from "antd";
import { ReactNode } from "react";

interface props {
  onClose: () => void;
  title?: string | undefined;
  open: boolean;
  width?: string | number | undefined;
  children: ReactNode;
}

export const AppDrawer = ({ onClose, open, width, title, children }: props) => {
  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      open={open}
      width={width}
      key={title}
    >
      {children}
    </Drawer>
  );
};
