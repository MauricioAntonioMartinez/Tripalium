import React from "react";
import styles from "../styles/results.module.scss";

interface Props {
  onClick: (id: string) => void;
}

export const JobCard = ({ onClick }: Props) => {
  return (
    <div className={styles.jobCard} onClick={() => onClick("1")}>
      <h1>Dummy Job</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nulla
        tenetur hic dolore, blanditiis eos? Ipsum, iusto ad enim neque amet
        numquam, optio non voluptas excepturi quidem dolore similique accusamus,
        possimus commodi. Harum, asperiores quidem porro enim voluptas illum a
        amet numquam aperiam optio incidunt et consequatur, facilis, quam
        officiis?
      </p>
      <span>Salary: $90,000</span>
    </div>
  );
};
