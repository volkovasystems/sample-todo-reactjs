/** @jsx React.DOM */

var todoApp = React.createClass( {
	"getInitialState": function getInitialState( ){
		return {
			"todoList": [ ]
		};
	},

	"render": function onRender( ){
		return (
			<div 
				className="todo-app-container col-md-4 col-md-offset-4"
				style={ {
					"margin-top": "10%" 
				} }>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h5>TODO LIST</h5>
					</div>

					<div className="panel-body">
						<todoInput parentComponent={ this } todoList={ this.state.todoList } />	
					</div>

					<todoList parentComponent={ this } todoList={ this.state.todoList }/>
				</div>
			</div>
		);
	}
} );

React.renderComponent( <todoApp />, $( "section.todo-app" )[ 0 ] );
