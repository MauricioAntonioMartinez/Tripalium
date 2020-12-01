import React from "react";
import { Tag } from "./Tag";
import styles from "../styles/tags.module.scss";

interface Props {
  tags: string[];
  remove: (index: number) => void;
}

export const Tags = ({ tags, remove }: Props) => {
  return (
    <div className={styles.tags}>
      {tags.map((tg, i) => {
        return (
          <Tag key={i} onClick={() => remove(i)}>
            {tg}
          </Tag>
        );
      })}
    </div>
  );
};
