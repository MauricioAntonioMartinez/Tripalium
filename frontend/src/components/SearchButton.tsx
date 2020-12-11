import React, { PropsWithChildren } from "react";
import styles from "../styles/common.module.scss";

interface Props {
  onClick: () => void;
}

export const SearchButton: React.FC<PropsWithChildren<Props & any>> = ({
  onClick,
  children,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={styles.searchButton}
      style={{ marginTop: "1rem" }}
      {...props}
    >
      {children}
    </button>
  );
};
