import { useState } from "react";

const Child = (props) =>{
return (
	<>
	<div>{props.message}</div>
	<button onClick={props.onClick}>Click Me {props.count}</button>
	</>
);
}

export default Child;