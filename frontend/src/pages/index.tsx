import React, { useState } from "react";
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

  console.log(props);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await restApi.post("/");
  //       console.log(res.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })();
  // }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <h1 className={styles.branch}>Tripalium</h1>
        <Search addTagHandler={addTagHandler} />
      </div>
      <div className={layout.mainContent}>
        <Tags tags={tags} remove={removeTagHandler} />
        {tags.length > 3 && (
          <SearchButton onClick={searchHandler}>Give me luck</SearchButton>
        )}
        {tags.length === 0 && <h1>Add tags to your search.</h1>}
        {/* {tags.length <= 3 && (
          <RecentSearches
            recent_searches={props?.recent_searches.slice(0, 6)}
          />
        )} */}
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
