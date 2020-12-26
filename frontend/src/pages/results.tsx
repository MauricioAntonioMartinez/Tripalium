import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { buildClient } from "../api/client";
import { JobCard } from "../components/JobCard";
import { JobDetails } from "../components/JobDetails";
import { LoadingSearch } from "../components/LoadingSearch";
import { Paginator } from "../components/Paginator";
import { Search } from "../components/Search";
import { SearchButton } from "../components/SearchButton";
import { Tags } from "../components/Tags";
import { __server__ } from "../constants/constants";
import { useTags } from "../hook/useTags";
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
  const { addTagHandler, removeTagHandler, tags } = useTags();
  const [loading, setLoading] = useState(false);

  const showDetailsHandler = (idx: number) => {
    const hasContent = props.jobs[idx]?.content;
    if (hasContent) {
      console.log(hasContent);
      setJobSelected(props?.jobs[idx]);
    }
  };
  const searchHandler = async () => {
    setLoading(true);
    router.replace(`/results?keywords=${tags.join("+")}`, "/results");
  };

  const changeJobsHandler = useCallback(
    (start: number, end: number) => setJobBoundaries({ start, end }),
    []
  );

  return (
    <div>
      <div className={styles.resultContainer}>
        <div className={styles.resultSearcher}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1
              onClick={() => {
                router.push("/");
              }}
            >
              Tripalium
            </h1>
            <Search disabled={false} addTagHandler={addTagHandler} />
            {tags.length >= 2 && !loading && (
              <SearchButton
                style={{ margin: "0 0.5rem" }}
                addTagHandler={addTagHandler}
                onClick={searchHandler}
              >
                Give me luck
              </SearchButton>
            )}
          </div>
          <Tags tags={tags} remove={removeTagHandler} />
          {/* {loading && <LoadingSearch  cancel={(d)=>{}}/>} */}
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
    const res = await axios.post(`${__server__}/scrape`, {
      keywords,
      headers: ctx.req.headers,
    });

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
