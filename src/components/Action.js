import React from "react";

const Action = ({ handleClick, type, className }) => {
  return (
    <div className={className} onClick={handleClick}>
      {type == "DELETE" ? <img src={'./delete.svg'} alt="delete"  />  : type && type}
    </div>
  );
};

export default Action;