import React, { useEffect, useState } from "react";
import styleLoading from "../styles/loading.module.scss";
import { Tags } from "../components/Tags";
import { Search } from "../components/Search";
import styles from "../styles/common.module.scss";
import layout from "../styles/layout.module.scss";
import { SearchButton } from "../components/SearchButton";
import { NextPageContext } from "next";
import { buildClient } from "../api/client";
import { RecentSearches } from "../components/RecentSearches";
interface Props {
  recent_searches: string[];
}

const index = (props: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [opacity, setOpacity] = useState(styleLoading.opacityOn);
  const addTagHandler = (tag: string) => setTags((tgs) => [...tgs, tag]);

  const removeTagHandler = (index: number) =>
    setTags((tags) => tags.filter((_, idx) => idx !== index));
  const searchHandler = async () => {
    const res = await buildClient()
      .post("/", {
        searches: tags,
      })
      .catch((e) => {
        console.log(e);
      });

    console.log(res);
  };

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setOpacity((op) =>
          op === styleLoading.opacityOn
            ? styleLoading.opacityOff
            : styleLoading.opacityOn
        );
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [loading]);

  console.log(props);

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <h1 className={styles.branch}>Tripalium</h1>
        <Search addTagHandler={addTagHandler} disabled={loading} />
      </div>
      <div className={layout.mainContent}>
        <Tags tags={tags} remove={removeTagHandler} />
        {tags.length > 3 && (
          <SearchButton onClick={searchHandler}>Give me luck</SearchButton>
        )}
        {/* {tags.length === 0 && <h1>Add tags to your search.</h1>} */}
        {/* {tags.length <= 3 && (
          <RecentSearches
            recent_searches={props?.recent_searches.slice(0, 6)}
          />
        )} */}
        {loading && (
          <div className={styleLoading.container}>
            <h1
              className={
                opacity === styleLoading.opacityOff
                  ? styleLoading.opacityOn
                  : styleLoading.opacityOff
              }
            >
              Looking for your jobs.
            </h1>
            <h1 className={opacity}>This would take a few seconds.</h1>

            <div className={styleLoading.loading}></div>
          </div>
        )}
      </div>
    </div>
  );
};

index.getInitialProps = async (ctx: NextPageContext) => {
  const axios = buildClient(ctx);
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
