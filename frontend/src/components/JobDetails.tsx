import React from "react";
import styles from "../styles/results.module.scss";

interface Props {
  content: string;
}

export const JobDetails = ({ content }: Props) => {
  return (
    <div
      className={styles.jobDetails}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
