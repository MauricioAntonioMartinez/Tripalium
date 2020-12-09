import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { buildClient } from "../api/client";
import { JobCard } from "../components/JobCard";
import { JobDetails } from "../components/JobDetails";
import { Search } from "../components/Search";
import styles from "../styles/results.module.scss";

const Results = (props) => {
  console.log(props);

  const [showDetails, setShowDetails] = useState(false);

  const showDetailsHandler = (id: string) => {
    setShowDetails(true);
  };

  return (
    <div className={styles.resultContainer}>
      <div className={styles.resultSearcher}>
        <h1>Tripalium</h1>
        <Search disabled={false} addTagHandler={() => {}} />
      </div>
      <div className={styles.results}>
        {Array.from([0, 0, 0, 0, 0]).map((e) => {
          return <JobCard onClick={showDetailsHandler} />;
        })}
      </div>
      {showDetails && <JobDetails content="<h1>This is a description.</h1>" />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let keywords: string[] = [];
  if (typeof ctx.query.keywords === "string") {
    keywords = ctx.query?.keywords?.split(" ");
  }
  const axios = buildClient(ctx.req);
  try {
    // const res = await axios.post("http://flask:5000/scrape", {
    //   keywords,
    //   headers: ctx.req.headers,
    // });
    // console.log(res.data);

    return {
      props: {
        // data: res?.data,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {},
    };
  }
};

export default Results;
