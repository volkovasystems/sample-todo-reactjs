/** @jsx React.DOM */

var todoInputComponent = React.createClass( {
	"statics": {
		"data": {
			"instanceSet": { },
			"instance": null
		},

		"create": function create( parentComponent, todoList, onlyOnce, uid ){
			var uid = uid || Math.round( ( Date.now( ) * Math.random( ) ) + Date.now( ) ).toString( );

			todoInputComponent.data.instanceSet[ uid ] = ( 
				<todoInputComponent 
					uid={ uid }
					parentComponent={ parentComponent }
					todoList={ todoList } />  
			);

			if( onlyOnce ){
				todoInputComponent.data.instance = todoInputComponent.data.instanceSet[ uid ];
				todoInputComponent.data.instanceSet[ uid ] = undefined;
				delete todoInputComponent.data.instanceSet[ uid ];

				return todoInputComponent.data.instance;
				
			}else{
				return todoInputComponent.data.instanceSet[ uid ];	
			}
		},

		"emptyData": function emptyData( ){
			todoInputComponent.data.instanceSet = { };
			todoInputComponent.data.instance = null;
		}
	},

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
					className="todo-input form-control"
					type="text"
					placeholder="TYPE SOMETHING AND PRESS ENTER TO ADD TODO"
					value={ this.state.todo }
					onChange={ this.onChange }
					onKeyPress={ this.onKeyPress } />
			</div>
		);
	}
} );