import React from 'react';
import './Todo.css'

class Search extends React.Component {
	// you will need a place to store your state in this component.
	// design `App` to be the parent component of your application.
	// this component is going to take care of state, and any change handlers you need to work with your state
	constructor(){
		super();
		this.state = {
			queryStr:''
		}
	}
	
	updateSearchQuery = (value)=>{
		let val =  value.trim()
		this.setState({queryStr: val})
		this.props.updateSearchQuery(val);
		console.log('onChange', val)
	}
	
	handleSearch = ()=>{
		this.props.onSearch(this.state.queryStr);
	}
	
	clearSearch = (e)=>{
		this.setState({queryStr: ''})
		this.props.clearSearch(e)
		//this.props.updateSearchQuery(e, '')
	}
	
	render(){
		return(
			<div className="search-container">
				<input type="text" className="searchInput" onChange={(e)=> this.updateSearchQuery(e.target.value)}/>
				<button className="searchButton" onClick={this.handleSearch}>Search</button>
				<button className="clearSearchButton" onClick={(e)=> this.clearSearch(e)}>Clear</button>
			</div>
		)
	}
}

export default Search
