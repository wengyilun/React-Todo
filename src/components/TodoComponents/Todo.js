import React from 'react';
import './Todo.css'

const Todo = (props)=>{
	const handleDeleteClick = (event)=>{
		props.onDeleteTodoClick(event, props.data);
	}
	
	return(
		<div className="todoItem">
			<input type="checkbox" className="completedCheckbox" onClick={()=> props.onToggleComppleted(props.data.id)}/>
			<h1 className={`todo${props.data.completed ? '-completed' : ''}`}>{props.data.task}</h1>
			<button className="closeButton" onClick={handleDeleteClick}/>
		</div>
	)
}

export default Todo
