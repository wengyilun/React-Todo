// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js
import React from 'react';
import './Todo.css'

const TodoForm = (props)=>{
	return(
		<form className="todoForm">
			<input
				onChange={props.onInputChange}
				value={props.task}
				placeholder="Enter Todo"
				onKeyPress={props.onKeyPress}/>
			<button
				className="addBtn"
				onClick={props.onAddButtonClick}>Add Todo</button>
			<button
				className="clearBtn"
				onClick={props.onClearButtonClick}>Clear Completed</button>
		</form>
	)
}

export default TodoForm
