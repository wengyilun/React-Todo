import React from 'react';
import TodoList from './components/TodoComponents/TodoList'
import TodoForm from './components/TodoComponents/TodoForm'
import Search from './components/TodoComponents/Search'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


import './App.css';

class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  constructor(){
    super();
    
    this.state = {
		  task:'',
		  completed:false,
		  todoMap: new Map(),
		  query:'',
		  todoList: [
			{
				task: 'Organize Garage',
				id: 1528817077286,
				completed: false
			},
			{
				task: 'Bake Cookies',
				id: 1528817084358,
				completed: false
			}
		 ]
		 // todoList: []
    }
  }
	
	componentDidMount(){
		let value = JSON.parse(localStorage.getItem('todoList'))
		if(value){
			this.setState({'todoList': value})
		}
	}
	
  updateTodoTask = event =>{
  	this.setState({
  		'task': event.target.value
  	})
  }
  
  addTodo = event =>{
  	if(event) event.preventDefault();
  	if(!this.state.task) return;
  	const newTodo = {
  		id: Date.now(),
  		completed: false,
  		task: this.state.task
  	}
  	let newList = [...this.state.todoList, newTodo]
  	this.setState({
		todoList: newList,
		task:''
  	})
	
	localStorage.setItem('todoList', JSON.stringify(newList))
  
  }
	
  clearTodoTask = event =>{
	event.preventDefault();
	this.setState({
		task: ''
	})
  }
  
  handleKeyPress = event =>{
	  if(event.key === 'Enter'){
		  event.preventDefault();
		  this.addTodo();
	  }
  }
  
  deleteTodo = (event, data) =>{
  	  let clonedArr = [...this.state.todoList]
	  clonedArr = clonedArr.filter(el => el.id !== data.id)
	  this.setState({
		  todoList:clonedArr
	  })
	  localStorage.setItem('todoList', JSON.stringify(clonedArr))
  }
  
  toggleCompleted = (id) =>{
  	let clonedArr = [...this.state.todoList]
  	clonedArr = clonedArr.map(el => {
		if(el.id === id){
			el.completed = ! el.completed
		}
		return el
  	})
	  this.setState({
		  todoList:clonedArr
	  })
	
	  localStorage.setItem('todoList', JSON.stringify(clonedArr))
  }
	
	clearCompleted = (event)=>{
  	  event.preventDefault();
	  let clonedArr = [...this.state.todoList]
	  clonedArr = clonedArr.filter(el => {
		 return !el.completed
	  })
	  this.setState({
		  todoList:clonedArr
	  })
	}
	
	updateSearchQuery = (queryStr)=>{
		this.setState({query : queryStr})
	}
	
	render() {
		let showingTodos
		
		if (this.state.query){
			const match = new RegExp(escapeRegExp(this.state.query), 'i')
			showingTodos = this.state.todoList.filter((todo) => match.test(todo.task))
		}else{
			showingTodos = this.state.todoList
		}
		
		showingTodos.sort(sortBy('task'))
	
		return (
		  <div className="wrapper-container" >
			<h2 className="app-title">Add your programming tasks</h2>
			<Search
				clearSearch={this.clearSearch}
				updateSearchQuery={this.updateSearchQuery}/>
			<TodoList
				todoList={showingTodos}
				onToggleComppleted={this.toggleCompleted}
				onDeleteTodoClick={this.deleteTodo}/>
			<TodoForm
				onInputChange={this.updateTodoTask}
				onAddButtonClick={this.addTodo}
				onClearButtonClick={this.clearTodoTask}
				onKeyPress={this.handleKeyPress}
				onClearCompleted={this.clearCompleted}
				task={this.state.task}/>
		  </div>
		);
  }
}

export default App;
