import React from 'react';
import TodoList from './components/TodoComponents/TodoList'
import TodoForm from './components/TodoComponents/TodoForm'
import Search from './components/TodoComponents/Search'
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
		  todoList: []
    }
  }
	
	componentDidMount(){
		let value = JSON.parse(localStorage.getItem('todoList'))
		if(value){
			this.setState({'todoList': value})
		}
	}
	
	
	getIdToShelfMap = () => {
		let todoMap = new Map()
		for (let todo of this.state.todoList) {
			todoMap.set(todo.id, todo)
		}
		return todoMap
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
	 localStorage.setItem('todoList', JSON.stringify(clonedArr))
	}
	
	search = (queryStr)=>{
		let clonedArr = [...this.state.todoList]
		clonedArr = clonedArr.filter(el => {
			if(el.task.indexOf(queryStr)!==-1){
				return el
			}
		})
		this.setState({
			todoList:clonedArr
		})
	}
	
	clearSearch = (event)=>{
		let clonedArr = [...this.state.todoList]
		this.setState({
			todoList:clonedArr
		})
	}
	
	
	updateSearchQuery = (queryStr)=>{
		this.search(queryStr)
	}
	
	render() {
    return (
      <div className="wrapper-container" >
        <h2 className="app-title">Add your programming tasks</h2>
        <Search
        	onSearch={this.search}
			clearSearch={this.clearSearch}
        	updateSearchQuery={this.updateSearchQuery}/>
        <TodoList
        	todoList={this.state.todoList}
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
