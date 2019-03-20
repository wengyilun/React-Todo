import React from 'react';
import './Todo.css'

const Todo = (props)=>{
	const {data} = props
	return(
		<div className="todoItem">
			<h1>{data.task}</h1>
			<button className="closeButton">X</button>
		</div>
	)
}

export default Todo
