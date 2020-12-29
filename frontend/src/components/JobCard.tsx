import React from "react";
import { JobDescription } from "../pages/results";
import styles from "../styles/results.module.scss";

interface Props {
  onClick: () => void;
  job: JobDescription;
}

export const JobCard = ({ onClick, job }: Props) => {
  return (
    <div className={styles.jobCard} onClick={onClick}>
      <h2>{job?.title}</h2>
      <p>Enterprise: {job?.enterprise}</p>
      <p>location: {job?.location}</p>
      {job?.salary && <span>Salary: {job?.salary}</span>}
      {/* <span>More details: <a href={job.}></a> </span> */}
    </div>
  );
};
