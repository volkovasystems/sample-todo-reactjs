/** @jsx React.DOM */

var todoList = React.createClass( {
	"onTodoRemove": function onTodoRemove( event ){
		var todoList = this.props.todoList;
		todoList = _.remove( todoList, 
			function onEachTodo( todo ){
				return todo != event.currentTarget.value;
			} );

		this.props.parentComponent.setState( {
			"todoList": todoList
		} );
	},

	"onEachTodo": function onEachTodo( todo, index ){
		return (
			<div 
				key={ index }
				className="todo-item list-group-item">

				<button 
					type="button" 
					className="close"
					onClick={ this.onTodoRemove }
					value={ todo }>
					<span aria-hidden="true">{ "\u00d7" }</span>
					<span className="sr-only">Close</span>
				</button>

				<small className="label label-default">{ index + 1 }.</small>

				<p 
					className="lead text-justify"
					style={ {
						"margin-bottom": "-5px" 
					} }>
					{ todo }
				</p>
			</div>
		);
	},

	"render": function onRender( ){
		return (
			<div className="todo-list-container list-group">
				{ this.props.todoList.map( this.onEachTodo ) }	
			</div>
		);
	}
} );