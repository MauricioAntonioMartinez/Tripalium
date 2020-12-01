import React, { PropsWithChildren } from "react";
import styles from "../styles/common.module.scss";

interface Props {
  onClick: () => void;
}

export const SearchButton: React.FC<PropsWithChildren<Props>> = ({
  onClick,
  children,
}) => {
  return (
    <button onClick={onClick} className={styles.searchButton}>
      {children}
    </button>
  );
};
