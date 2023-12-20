import { Box } from "@mui/material";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <Box sx={{ backgroundColor: "red" }}>{children}</Box>;
};

export default Layout;
