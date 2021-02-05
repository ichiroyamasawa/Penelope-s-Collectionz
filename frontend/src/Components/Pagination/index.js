import React from "react";
import BtnPink from "./../Forms/ButtonPink";

const Pagination = ({ onLoadMoreEvt = () => {} }) => {
  return <BtnPink onClick={() => onLoadMoreEvt()}>Load More</BtnPink>;
};

export default Pagination;
