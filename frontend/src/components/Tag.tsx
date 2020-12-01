import React, { PropsWithChildren } from "react";
import styles from "../styles/tags.module.scss";

interface Props {
  onClick: () => void;
}

export const Tag: React.FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
}) => {
  return (
    <div className={styles.tag}>
      {children}
      <span onClick={onClick}>x</span>
    </div>
  );
};
