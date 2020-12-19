import React from "react";
import "./Output.css";

const Output = (props) => {
  return(
    <div id="output-wrapper">
        {props.children}
    </div>
  )
}

export default Output;