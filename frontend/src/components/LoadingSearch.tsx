import React, { useEffect, useState } from "react";
import styleLoading from "../styles/loading.module.scss";
import { SearchButton } from "./SearchButton";

interface Props {
  cancel: () => void;
}

export const LoadingSearch = ({ cancel }: Props) => {
  const [opacity, setOpacity] = useState(styleLoading.opacityOn);
  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      setOpacity((op) =>
        op === styleLoading.opacityOn
          ? styleLoading.opacityOff
          : styleLoading.opacityOn
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
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

      <SearchButton onClick={cancel} style={{ marginTop: "1rem" }}>
        Cancel
      </SearchButton>
    </div>
  );
};
