import React from "react";
import "./Formula.css";

const Formula = (props) => {
  return(
    <div id="formula-wrapper">
        {props.children}
    </div>
  )
}

export default Formula;