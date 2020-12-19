import React from "react";
import "./Button.css";

const Button = (props) => {

  const buttonStyle = !isNaN(props.children) || props.children === "."
  ? {backgroundColor : "#3F3F3F"}
  : isNaN(props.chuildren) && props.children !== "AC"
  ? {backgroundColor : "#707070"}
  : props.children === "AC"
  ? {backgroundColor : "#B73225"}
  : {};

  return(
    <button 
    id="button-wrapper"
    style={buttonStyle}
    onClick={() => {props.handleClick(props.children)}}
    >
        {props.children}
    </button>
  )
}

export default Button;