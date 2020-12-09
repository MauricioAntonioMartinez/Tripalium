import React, { useEffect, useState } from "react";
import styleLoading from "../styles/loading.module.scss";
import { Tags } from "../components/Tags";
import { Search } from "../components/Search";
import styles from "../styles/common.module.scss";
import layout from "../styles/layout.module.scss";
import { useRouter } from "next/router";
import { SearchButton } from "../components/SearchButton";
import { NextPageContext } from "next";
import { buildClient } from "../api/client";
import { RecentSearches } from "../components/RecentSearches";
import { LoadingSearch } from "../components/LoadingSearch";
interface Props {
  recent_searches: string[];
}

const index = ({ recent_searches }: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const addTagHandler = (tag: string) => setTags((tgs) => [...tgs, tag]);

  const removeTagHandler = (index: number) =>
    setTags((tags) => tags.filter((_, idx) => idx !== index));
  const searchHandler = async () => {
    setLoading(true);
    router.push(`/results?keywords=${tags.join("+")}`, "/results");
  };
  const cancelSearchHandler = () => {
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <h1 className={styles.branch}>Tripalium</h1>
        <Search addTagHandler={addTagHandler} disabled={loading} />
      </div>
      <main className={layout.mainContent}>
        <Tags tags={tags} remove={removeTagHandler} />
        {tags.length >= 2 && !loading && (
          <SearchButton onClick={searchHandler}>Give me luck</SearchButton>
        )}
        <LoadingSearch
          cancel={cancelSearchHandler}
          keywordsLength={tags.length + recent_searches.length}
          loading={loading}
        />
        <RecentSearches
          recent_searches={recent_searches}
          shouldNotDisplay={tags.length === 0 && recent_searches.length === 0}
        />
      </main>
    </div>
  );
};

index.getInitialProps = async (ctx: NextPageContext) => {
  const axios = buildClient(ctx.req);
  const res = await axios.get("http://flask:5000/", {
    headers: ctx.req.headers,
  });
  return {
    recent_searches: res.data?.recent_searches || [],
  };
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const axios = buildClient(ctx)
//   const res = await axios.post("http://flask:5000/", {
//     headers: ctx.req.headers,
//   });
//   console.log(res.data);
//   return {
//     props: {},
//   };
// };

export default index;
