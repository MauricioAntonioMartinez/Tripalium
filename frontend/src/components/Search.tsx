import React, { useState } from "react";
import styles from "../styles/search.module.scss";
interface Props {
  addTagHandler: (tag: string) => void;
  disabled:boolean;
}

export const Search = ({ addTagHandler,disabled }: Props) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <input
    disabled={disabled}
      className={styles.search}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if (inputValue == "") return;
          setInputValue("");
          addTagHandler(inputValue.toLowerCase());
        }
      }}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};
