import React, { useState } from "react";
import { Tags } from "../components/Tags";
import { Search } from "../components/Search";
import styles from "../styles/common.module.scss";
import tg from "../styles/tags.module.scss";
import { SearchButton } from "../components/SearchButton";
interface Props {}

const index = (props: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const addTagHandler = (tag: string) => setTags((tgs) => [...tgs, tag]);
  const removeTagHandler = (index: number) =>
    setTags((tags) => tags.filter((_, idx) => idx !== index));
  const searchHandler = () => {
    console.log("SEARCH");
  };

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <h1 className={styles.branch}>Tripalium</h1>
        <Search addTagHandler={addTagHandler} />
      </div>
      <Tags tags={tags} remove={removeTagHandler} />
      {tags.length > 3 && (
        <SearchButton onClick={searchHandler}>Give me luck</SearchButton>
      )}
    </div>
  );
};

export default index;
