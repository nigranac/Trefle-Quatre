"use client";
import React from "react";
import Tooltip from "../Tooltip";

const WordWithTooltip = ({ frenchWord, turkishTranslation, tick }) => {
  return (
    <>
      <Tooltip tip={turkishTranslation} span={true}>
        <span
          style={{
            cursor: "pointer",
            color: tick ? "#4cc2ad" : "rgb(122 136 46)",
            fontWeight: "bold",
            paddingRight: "5px",
          }}
          data-tip
          data-for={`tooltip-${frenchWord}`}
        >
          {frenchWord}
        </span>
      </Tooltip>
    </>
  );
};

export default WordWithTooltip;
