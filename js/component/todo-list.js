/** @jsx React.DOM */

var todoListComponent = React.createClass( {
	"statics": {
		"data": {
			"instanceSet": { },
			"instance": null
		},

		"create": function create( parentComponent, todoList, onlyOnce, uid ){
			var uid = uid || Math.round( ( Date.now( ) * Math.random( ) ) + Date.now( ) ).toString( );

			todoListComponent.data.instanceSet[ uid ] = ( 
				<todoListComponent 
					uid={ uid }
					parentComponent={ parentComponent }
					todoList={ todoList } />  
			);

			if( onlyOnce ){
				todoListComponent.data.instance = todoListComponent.data.instanceSet[ uid ];
				todoListComponent.data.instanceSet[ uid ] = undefined;
				delete todoListComponent.data.instanceSet[ uid ];

				return todoListComponent.data.instance;
				
			}else{
				return todoListComponent.data.instanceSet[ uid ];	
			}
		},

		"emptyData": function emptyData( ){
			todoListComponent.data.instanceSet = { };
			todoListComponent.data.instance = null;
		}
	},

	"getInitialState": function getInitialState( ){
		return {
			"todoList": [ ] 
		};
	},

	"onTodoRemove": function onTodoRemove( event ){
		var todoList = this.state.todoList;
		
		_.remove( todoList, 
			function onEachTodo( todo ){
				return todo === event.currentTarget.value;
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

	"componentWillReceiveProps": function componentWillReceiveProps( nextProps ){
		this.setState( {
			"todoList": nextProps.todoList
		} );
	},
	
	"render": function onRender( ){
		return (
			<div className="todo-list-container list-group">
				{ this.state.todoList.map( this.onEachTodo ) }	
			</div>
		);
	}
} );