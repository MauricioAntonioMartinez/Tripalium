import axios from "axios";
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
  const [jobs, setJobs] = useState(props.jobs);
  const [jobSelected, setJobSelected] = useState<JobDescription | null>();
  const [jobBoundaries, setJobBoundaries] = useState({ start: 0, end: 10 });
  const { addTagHandler, removeTagHandler, tags, resetTags } = useTags();
  const [loading, setLoading] = useState(false);

  const showDetailsHandler = (idx: number) => {
    const hasContent = jobs[idx]?.content;
    if (hasContent) {
      setJobSelected(props?.jobs[idx]);
    }
  };
  const searchHandler = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:5000/scrape`, {
        keywords: tags,
      });
      setJobs(res?.data?.jobs);
      setJobSelected(null);
      setLoading(false);
      resetTags();
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    } finally {
    }

    // router.push(`/results?keywords=${tags.join("+")}`, "/results");
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
            {loading && (
              <LoadingSearch minimal cancel={() => setLoading(!loading)} />
            )}
          </div>
          {!loading && <Tags tags={tags} remove={removeTagHandler} />}
        </div>
        <div className={styles.results}>
          <div>
            {jobs
              ?.slice(jobBoundaries.start, jobBoundaries.end)
              .map((job, i) => {
                return (
                  <JobCard
                    key={i+tags.join()}
                    job={job}
                    onClick={() => showDetailsHandler(jobBoundaries.start + i)}
                  />
                );
              })}
              {jobs.length === 0  &&  <div className={styles.notFound}>We couldn't find any results sorry. Please try something else. 🥺</div>}        
            </div>
        </div>
        {jobSelected && <JobDetails jobSelected={jobSelected} />}
      </div>
      {jobs?.length > 9 && (
        <Paginator changePages={changeJobsHandler} totalJobs={jobs.length} />
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
    console.log(__server__)
    const res = await axios.post(`${__server__}/scrape`, {
      keywords,
      headers: ctx.req.headers,
    });

    console.log(res.data?.fromCache);

    return {
      props: {
        jobs: res?.data?.jobs || [],
      },
    };
  } catch (e) {
    console.log(e.message);
    return {
      props: {},
    };
  }
};

export default Results;
