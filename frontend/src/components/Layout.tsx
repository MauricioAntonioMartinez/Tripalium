import React, { PropsWithChildren } from "react";
import st from "../styles/layout.module.scss";
interface Props {}

export const Layout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return <main className={st.layout}>{children}</main>;
};
