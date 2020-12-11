import React, { useEffect, useRef, useState } from "react";
import { idText } from "typescript";
import styles from "../styles/pagination.module.scss";

interface Props {
  totalJobs: number;
  changePages: (start: number, end: number) => void;
}

const JOBS_PER_PAGE = 10;

export const Paginator = React.memo(
  ({ totalJobs, changePages }: Props) => {
    console.log(`PAGINATOR RENDER: ${totalJobs}`);
    const totalPages = useRef(Math.ceil(totalJobs / JOBS_PER_PAGE) - 1);
    const [currentPage, setCurrentPage] = useState(totalJobs > 0 ? 1 : 0);

    const changePageHandler = (page: number) => {
      setCurrentPage(page);
      changePages(page * JOBS_PER_PAGE, page * JOBS_PER_PAGE + JOBS_PER_PAGE);
    };

    return (
      <div className={styles.paginationContainer}>
        {currentPage - 3 >= 1 && (
          <>
            <div
              className={styles.limitPage}
              onClick={changePageHandler.bind(null, 1)}
            >
              1
            </div>
            <Dots />
          </>
        )}

        <Siblings
          currentPage={currentPage}
          totalPages={totalPages.current}
          direction="left"
          onClick={changePageHandler}
        />
        <div className={styles.currentPage}>{currentPage}</div>
        <Siblings
          onClick={changePageHandler}
          currentPage={currentPage}
          totalPages={totalPages.current}
          direction="right"
        />

        {currentPage + 4 <= totalPages.current && (
          <>
            <Dots />
            <div
              className={styles.limitPage}
              onClick={changePageHandler.bind(null, totalPages.current)}
            >
              {totalPages.current}
            </div>
          </>
        )}
      </div>
    );
  },
  (
    { totalJobs: prevTotal }: Readonly<Props>,
    { totalJobs: nextTotal }: Readonly<Props>
  ) => {
    return prevTotal === nextTotal;
  }
);

const Dots = () => (
  <div className={styles.dotsContainer}>
    {Array.from(new Array(3)).map((e, index) => {
      return <div key={index}></div>;
    })}
  </div>
);
const Siblings = ({
  currentPage,
  direction,
  totalPages,
  onClick,
}: {
  direction: "right" | "left";
  currentPage: number;
  totalPages: number;
  onClick: (page: number) => void;
}) => {
  const pages = Array.from(new Array(4)).map((_, index) => {
    const displayPage =
      currentPage + (index + 1) * (direction === "left" ? -1 : 1);

    if (displayPage < 1 || displayPage > totalPages) {
      return null;
    }
    return (
      <div
        key={index}
        className={styles.page}
        onClick={onClick.bind(null, displayPage)}
      >
        {displayPage}
      </div>
    );
  });

  return <>{direction === "left" ? pages.reverse() : pages}</>;
};
