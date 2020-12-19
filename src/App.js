import React, {useEffect, useState } from "react";
import Button from "./Button";
import Formula from "./Formula";
import Output from "./Output";
import "./App.css";
import { evaluate } from 'mathjs';


const App = () => {

  const [on, setOn] = useState(true);
  const [input, setInput] = useState(0);
  const [prevValue, setPrevValue] = useState("");
  const [operator, setOperator] = useState("");
  const [formula, setFormula] = useState("");
  const [calc, setCalc] = useState(true);
  
  useEffect(() => {
    setInput("WELCOME");
    setTimeout(() => {
      setInput(0)
    }, 1500)
  },[])

  const toggleOn = () => {
    setOn(!on);
    if(on){
      setInput("");
    }else{
      setInput("WELCOME");
      setTimeout(() => {setInput(0)}, 1500);
    }
  };

  const toggleCalc = () => {
    setCalc(!calc);
    if(on){
      if(!calc){
        setFormula("");
        setOperator("");
        setPrevValue("");
        setInput("IMMEDIATE");
        setTimeout(() => {
          setInput(0);
        },1000);
      }else{
        setFormula("");
        setOperator("");
        setPrevValue("");
        setInput("FORMULA");
        setTimeout(() => {
          setInput(0);
        },1000);
      }
    }else{
      return;
    }
  };

  const addNumberToInput = (value) => {
    if(on){
      var operatorRegex = /[-+x÷]$/;
      var decimalRegex = /[.]/g;
      if(value === "."){
        if(!decimalRegex.test(input)){
          setInput(input + value);
          setFormula(formula + value);
        }if(input === 0 ||operatorRegex.test(input)){
          setFormula(formula + 0 + value);
          setInput(0 + value);
        }
      }
      if(!isNaN(value)){
        setFormula(formula + value);
        setInput(parseFloat(input + value));
      }
      if(operatorRegex.test(input)){
        setInput("");
        setTimeout(() => {setInput(value)});
      }
      if(String(input).length > 14){
        setInput(String("DIGIT LIMIT MET"));
        setTimeout(() => {
          setInput(input);
        },1000);
        setFormula(formula.slice(0, formula.length));
      }
      }else{
        return;
      }
  };

  const allClear = () => {
    if(on){
      setInput(0);
      setFormula("");
      setPrevValue("");
      setOperator("");
    }else{
      return;
    }
  }

  const handleDelete = () => {
    if(on){
      if(input !== ""){
        setInput(String(input).slice(0, String(input).length -1));
        setFormula(formula.slice(0, formula.length - 1));
      }else{
        return;
      }
    }else{
      return;
    } 
  };

  const plusMinus = () => {
    if(on){
      setFormula(formula * -1);
      setInput(input * -1);
    }else{
      return;
    }
  };

  const toPercent = () => {
    if(on){
      setFormula(formula / 100);
      setInput(input / 100);
    }
  };

  const calculatePrevValue = () => {
    if(on){
      if(!isNaN(parseFloat(input))){
        if(operator === "plus"){
          setPrevValue(parseFloat(prevValue) + parseFloat(input));
        }else if(operator === "subtract"){
          var doubleMinus = /[-]{2}/;
          if(doubleMinus.test(formula)){
            setPrevValue(parseFloat(prevValue) + parseFloat(input));
          }else{
            setPrevValue((parseFloat(prevValue)) - (parseFloat(input)));
          }
        }else if(operator === "multiply"){
          setPrevValue(parseFloat(prevValue) * parseFloat(input));
        }else if(operator === "divide"){
          setPrevValue(parseFloat(prevValue) / parseFloat(input));
        }
        }
      }else{
        return;
      }
  };

  const add = (value) => {
    if(on){
      var operatorRegex = /[-+x÷]$/;
      if(calc){
        if(operator !== ""){
          calculatePrevValue();
        }else{
          setPrevValue(parseFloat(input));
        }
        if(operatorRegex.test(formula)){
          setFormula(formula.slice(0, formula.length - 1) + value);
        }else{
          setFormula(formula + value);
        }
        setInput("");
        setTimeout(() => {setInput(value)});
        setOperator("plus");
      }else{
        if(!operatorRegex.test(formula)){
          setFormula(formula + value);
        }else{
          setFormula(formula.slice(0, formula.length - 1) + value);
        }
        setInput("");
        setTimeout(() => {setInput(value)});
      }
    }else{
        return;
    } 
  };

  const subtract = (value) => {
    if(on){
      var operatorRegex = /[+x÷]$/;
      if(calc){
        var doubleMinus = /[-]{2}$/;
        if(operator !== ""){
          calculatePrevValue();
        }else{
          setPrevValue(parseFloat(input));
        }
        if(operatorRegex.test(formula)){
          setFormula(formula.slice(0, formula.length - 1) + value);
        }else{
          setFormula(formula + value);
        }
        if(doubleMinus.test(formula)){
          setFormula(formula.slice(0, formula.length - 1) + value);
        }
        setInput("");
        setTimeout(() => {setInput(value)});
        setOperator("subtract");
      }else{
        if(!operatorRegex.test(formula)){
          setFormula(formula + value);
        }else{
          setFormula(formula.slice(0, formula.length - 1) + value);
        }
        setInput("");
        setTimeout(() => {setInput(value)});
      }
    }else{
      return;
    }  
  };

  const multiply = (value) => {
    if(on){
      var operatorRegex = /[-+x÷]$/;
      var operatorFormula = /[-+*/]$/;
      if(calc){
        if(operator !== ""){
          calculatePrevValue();
        }else{
          setPrevValue(parseFloat(input));
        }
        if(operatorRegex.test(formula)){
          setFormula(formula.slice(0, formula.length - 1) + value);
        }else{
          setFormula(formula + value);
        }
        setInput("");
        setTimeout(() => {setInput(value)});
        setOperator("multiply");
      }else{
        if(!operatorFormula.test(formula)){
          setFormula(formula + "*");
        }else{
          setFormula(formula.slice(0, formula.length - 1) + "*");
        }
        setInput("");
        setTimeout(() => {setInput(value)});
      }
    }else{
      return;
    } 
  };

  const divide = (value) => {
    if(on){
    var operatorRegex = /[-+x÷]$/;
    var operatorFormula = /[-+*/]$/;
      if(calc){
        if(operator !== ""){
          calculatePrevValue();
        }else{
          setPrevValue(parseFloat(input));
        }
        if(operatorRegex.test(formula)){
          setFormula(formula.slice(0, formula.length - 1) + value)
        }else{
          setFormula(formula + value);
        }
        setInput("");
        setTimeout(() => {setInput(value)});
        setOperator("divide");
      }else{
        if(!operatorFormula.test(formula)){
          setFormula(formula + "/");
        }else{
          setFormula(formula.slice(0, formula.length - 1) + "/");
        }
        setInput("");
        setTimeout(() => {setInput(value)});
      }
    }else{
      return;
    } 
  };

  const getEvaluate = (value) => {
    if(on){
      if(calc){
        var currValue = parseFloat(input);
        if(!isNaN(parseFloat(currValue))){
        if(operator === "plus"){
          setInput(prevValue + currValue);
          setFormula(formula + value + (prevValue + currValue).toString());
        }else if(operator === "subtract"){
          var doubleMinus = /[-]{2}/;
          if(doubleMinus.test(formula)){
            setInput(prevValue + currValue);
            setFormula(formula + value + (prevValue + currValue).toString());
          }else{
            setInput(prevValue - currValue);
            setFormula(formula + value + (prevValue - currValue).toString());
          }
        }else if(operator === "multiply"){
          setInput(prevValue * currValue);
          setFormula(formula + value + (prevValue * currValue).toString());
        }else if(operator === "divide"){
          setInput(prevValue / currValue);
          setFormula(formula + value + (prevValue / currValue).toString());
        }
      }
        setOperator("");
      }else{
        setFormula(formula + "=" + evaluate(String(formula)));
        setInput(evaluate(String(formula)));
      }
    }else{
      return;
    }
  };

    const floatLeft = {
      float : "left"
    };
    const floatRight = {
      float : "right"
    };

    const onStyle = on
    ? floatLeft
    : floatRight;

    const clacStyle = calc
    ? floatLeft 
    : floatRight

  return(
    <div id="calculator">
      <div className="row">
        <Formula>
          {formula}
        </Formula>
      </div>
      <div className="row">
          <Output>
            {input}
          </Output>
      </div>
      <div id="switches">
        <div class ="switch" id="switch" onClick={toggleOn}>
          ON
          <div class="switch-wrapper">
            <div style={onStyle} class="button">
            </div>
          </div>
        </div>
        <div class ="switch" id="calc" onClick={toggleCalc}>
          CALC
          <div class="switch-wrapper">
            <div style={clacStyle} class="button">
            </div>
          </div>
        </div>
      </div>
      <div id="buttons">
        <Button handleClick={addNumberToInput}>7</Button>
        <Button handleClick={addNumberToInput}>8</Button>
        <Button handleClick={addNumberToInput}>9</Button>
        <Button handleClick={handleDelete}>DEL</Button>
        <Button handleClick={allClear}>AC</Button> 
        <Button handleClick={addNumberToInput}>4</Button>
        <Button handleClick={addNumberToInput}>5</Button>
        <Button handleClick={addNumberToInput}>6</Button>
        <Button handleClick={multiply}>x</Button>
        <Button handleClick={divide}>÷</Button>
        <Button handleClick={addNumberToInput}>1</Button>
        <Button handleClick={addNumberToInput}>2</Button>
        <Button handleClick={addNumberToInput}>3</Button>
        <Button handleClick={add}>+</Button>
        <Button handleClick={subtract}>-</Button>
        <Button handleClick={addNumberToInput}>0</Button>
        <Button handleClick={addNumberToInput}>.</Button>
        <Button handleClick={plusMinus}>±</Button>
        <Button handleClick={toPercent}>%</Button>
        <Button handleClick={getEvaluate}>=</Button>
      </div>
    </div>
  )
}

export default App;