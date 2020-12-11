import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { buildClient } from "../api/client";
import { JobCard } from "../components/JobCard";
import { JobDetails } from "../components/JobDetails";
import { Paginator } from "../components/Paginator";
import { Search } from "../components/Search";
import styles from "../styles/results.module.scss";

export interface JobDescription {
  content?: string;
  enterprise: string;
  location?: string;
  urgent?: boolean;
  title: string;
  aspects_summary?: string[];
  salary?: string;
}

interface Props {
  jobs: JobDescription[];
}

const Results = (props: Props) => {
  const router = useRouter();
  const [jobSelected, setJobSelected] = useState<JobDescription | null>();
  const [jobBoundaries, setJobBoundaries] = useState({ start: 0, end: 10 });

  const showDetailsHandler = (idx: number) => {
    const hasContent = props.jobs[idx]?.content;
    if (hasContent) {
      console.log(hasContent);
      setJobSelected(props?.jobs[idx]);
    }
  };

  const changeJobsHandler = useCallback(
    (start: number, end: number) => setJobBoundaries({ start, end }),
    []
  );

  return (
    <div>
      <div className={styles.resultContainer}>
        <div className={styles.resultSearcher}>
          <h1
            onClick={() => {
              router.push("/");
            }}
          >
            Tripalium
          </h1>
          <Search disabled={false} addTagHandler={() => {}} />
        </div>
        <div className={styles.results}>
          <div>
            {props?.jobs
              ?.slice(jobBoundaries.start, jobBoundaries.end)
              .map((job, i) => {
                return (
                  <JobCard
                    key={i}
                    job={job}
                    onClick={() => showDetailsHandler(jobBoundaries.start + i)}
                  />
                );
              })}
          </div>
        </div>
        {jobSelected && <JobDetails jobSelected={jobSelected} />}
      </div>
      {props.jobs?.length > 9 && (
        <Paginator
          changePages={changeJobsHandler}
          totalJobs={props.jobs.length}
        />
      )}
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
    const res = await axios.post("http://flask:5000/scrape", {
      keywords,
      headers: ctx.req.headers,
    });
    // console.log(res.data);

    // let dummy = [];
    // for (let i = 0; i < 291; i++)
    //   dummy.push({ title: `sdfs = ${i}`, content: "dummy" });

    return {
      props: {
        jobs: res?.data?.jobs,
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
