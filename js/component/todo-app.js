/** @jsx React.DOM */

var todoApp = React.createClass( {
	"statics": {
		"data": {
			"instanceSet": { },
			"instance": null
		},

		"create": function create( onlyOnce, uid ){
			var uid = uid || Math.round( ( Date.now( ) * Math.random( ) ) + Date.now( ) ).toString( );

			todoApp.data.instanceSet[ uid ] = ( <todoApp uid={ uid } /> );

			if( onlyOnce ){
				todoApp.data.instance = todoApp.data.instanceSet[ uid ];
				todoApp.data.instanceSet[ uid ] = undefined;
				delete todoApp.data.instanceSet[ uid ];

				return todoApp.data.instance;
				
			}else{
				return todoApp.data.instanceSet[ uid ];	
			}
		},

		"emptyData": function emptyData( ){
			todoApp.data.instanceSet = { };
			todoApp.data.instance = null;
		}
	},

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
						{ todoInputComponent.create( this, this.state.todoList, true, this.props.uid ) }
					</div>

					{ todoListComponent.create( this, this.state.todoList, true, this.props.uid ) }
				</div>
			</div>
		);
	}
} );


React.renderComponent( todoApp.create( true ), $( "section.todo-app" )[ 0 ] );