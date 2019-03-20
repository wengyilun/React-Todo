// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js
import React from 'react';
import Todo from './Todo';
import './Todo.css'

const TodoList = (props)=>{
	const {todoList} =  props;
	return(
		<div className="todoListContainer">
			<ul className="todoList">
				{todoList.map(item => <Todo key={item.id} data={item}/>)}
			</ul>
		</div>
	)
}

export default TodoList
