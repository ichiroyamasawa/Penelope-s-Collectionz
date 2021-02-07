import React from "react";
import BtnCoral from "./../Forms/ButtonCoral";
import "./styles.css";

export const PaginationNext = ({ onLoadMoreEvt = () => {} }) => {
  return (
    <div className="paginationBtn">
      <BtnCoral onClick={() => onLoadMoreEvt()}>
        <i class="fa fa-chevron-circle-down" aria-hidden="true"></i> Load More
      </BtnCoral>
    </div>
  );
};

// export const PaginationBack = ({ onLoadBackEvt = () => {} }) => {
//   return (
//     <BtnPink onClick={() => onLoadBackEvt()}>
//       <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
//     </BtnPink>
//   );
// };
