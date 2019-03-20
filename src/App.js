import React from 'react';
import TodoList from './components/TodoComponents/TodoList'
import TodoForm from './components/TodoComponents/TodoForm'
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
  	
  	this.setState({
		todoList: [...this.state.todoList, newTodo]
  	})
  }
	
  clearTodoTask = event =>{
	event.preventDefault();
	this.setState({
		task: ''
	})
  }
  
  handleKeyPress = event =>{
	  if(event.key === 'Enter'){
		  this.addTodo();
	  }
  }
  
  render() {
    return (
      <div className="wrapper-container" >
        <h2>Welcome to your Todo App!</h2>
        <TodoList todoList={this.state.todoList}/>
		<TodoForm
			onInputChange={this.updateTodoTask}
			onAddButtonClick={this.addTodo}
			onClearButtonClick={this.clearTodoTask}
			onKeyPress={this.handleKeyPress}
			task={this.state.task}/>
      </div>
    );
  }
}

export default App;
