import React from "react";
import styles from "../styles/common.module.scss";

interface Props {
  recent_searches?: string[];
  shouldNotDisplay:boolean;
}

export const RecentSearches = ({shouldNotDisplay, recent_searches }: Props) => {

  if(shouldNotDisplay) return null;

  return (
    <div className={styles.recent_searches}>
      <h1>Recent Searches</h1>
      <ul>
        {recent_searches?.map((search, i) => {
          return <li key={i}>{search} <span>></span> </li>;
        })}
      </ul>
    </div>
  );
};
