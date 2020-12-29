import React, { useEffect, useState } from "react";
import styleLoading from "../styles/loading.module.scss";
import { SearchButton } from "./SearchButton";

interface Props {
  cancel: () => void;
  minimal?:boolean
}

export const LoadingSearch = ({ cancel ,minimal}: Props) => {
  const [opacity, setOpacity] = useState(styleLoading.opacityOn);
  useEffect(() => {
    let interval;

    if(!minimal){
      interval = setInterval(() => {
        setOpacity((op) =>
          op === styleLoading.opacityOn
            ? styleLoading.opacityOff
            : styleLoading.opacityOn
        );
      }, 2000);
    }


    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styleLoading.container} style={minimal && {flexDirection: "row"}}>
     {!minimal 
     
     && <>
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
      </>
     }

      <div className={styleLoading.loading} style={minimal && {margin:"0rem 2rem"}}></div>

      <SearchButton onClick={cancel} style={{ margin:minimal ? "0rem 1rem": "1rem 0rem" }}>
        Cancel
      </SearchButton>
    </div>
  );
};
