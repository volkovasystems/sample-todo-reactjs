/** @jsx React.DOM */

//: var React = require( "react/addons" );

var todoInput = React.createClass( {
	"getInitialState": function getInitialState( ){
		return {
			"todo": ""
		};
	},

	"onChange": function onChange( event ){
		this.setState( {
			"todo": event.target.value
		} );
	},

	"onKeyPress": function onKeyPress( event ){
		if( event.key == "Enter" ){
			var todoList = this.props.todoList;

			todoList.push( event.target.value );

			this.props.parentComponent.setState( {
				"todoList": todoList
			} );

			this.setState( {
				"todo": ""
			} );
		}
	},

	"render": function onRender( ){
		return (
			<div className="todo-input-container">
				<input 
					className="form-control"
					type="text"
					value={ this.state.todo }
					onChange={ this.onChange }
					onKeyPress={ this.onKeyPress } />
			</div>
		);
	}
} );

//: module.exports = todoInput;