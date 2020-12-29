import React from "react";
import { JobDescription } from "../pages/results";
import styles from "../styles/results.module.scss";

interface Props {
  jobSelected: JobDescription;
}

export const JobDetails = ({ jobSelected }: Props) => {
  console.log(jobSelected.salary);
  return (
    <div className={styles.jobDetailsContainer}>
      <h1>{jobSelected?.title}</h1>
      <div>
        <h3>
          {jobSelected?.enterprise}
          {jobSelected?.urgent && <span>- Urgent</span>}
        </h3>
      </div>
      {jobSelected.salary && (
        <h4>
          <strong>{jobSelected?.salary}</strong>
        </h4>
      )}
      <div
        className={styles.jobDetails}
        dangerouslySetInnerHTML={{ __html: jobSelected?.content }}
      />
    </div>
  );
};
