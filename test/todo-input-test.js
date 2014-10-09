var webdriver = require( "webdriverio" );
var should = require( "should" );
var assert = require( "assert" );

describe( "todoInput",
	function testTodoInput( ){

		this.timeout( 99999999 );
		var client = null;

		before( function onBefore( done ){
			client = webdriver.remote( { 
				"desiredCapabilities": {
					"browserName": "phantomjs"
				}
			} );

			client.init( done );
		} );

		it( "should have a todoInputComponent ReactJS component class",
			function testCase( done ){
				var self = this;

				client
					.url( "http://localhost:8080/" )
					.execute( function onExecute( ){

						return (
							"todoInputComponent" in window && 
							typeof window[ "todoInputComponent" ] == "function" &&
							React.addons.TestUtils.isDescriptorOfType( todoInputComponent( ), todoInputComponent )
						);

					}, function onResult( error, result ){
						assert.ok( result.value, self._runnable.title );
					} )
					.call( done );
			} );

		it( "should return a todoInputComponent component instance when create( ) static method was called",
			function testCase( done ){
				var self = this;

				client
					.url( "http://localhost:8080/" )
					.execute( function onExecute( ){
						var component = todoInputComponent.create( );

						return React.addons.TestUtils.isDescriptorOfType( component, todoInputComponent );

					}, function onResult( error, result ){
						assert.ok( result.value, self._runnable.title );
					} )
					.call( done );
			} );

		it( "should store the instance in the instanceSet static property when create( ) static method was called",
			function testCase( done ){
				var self = this;

				client
					.url( "http://localhost:8080/" )
					.execute( function onExecute( ){
						todoInputComponent.emptyData( );

						var mockTodoList = [ "mock-todo-list" ];
						var mockParentComponent = { "mock": "parent-component" };

						var component = todoInputComponent.create( mockTodoList, mockParentComponent, false, "mockComponent" );

						return (
							todoInputComponent.data.instanceSet[ "mockComponent" ] === component && 
							_.keys( todoInputComponent.data.instanceSet ).length == 1
						);

					}, function onResult( error, result ){
						assert.ok( result.value, self._runnable.title );
					} )
					.call( done );
			} );

		it( "should have todoList and parentComponent in the props",
			function testCase( done ){
				var self = this;

				client
					.url( "http://localhost:8080/" )
					.execute( function retrieveInitialStateSet( ){
						var mockTodoList = [ "mock-todo-list" ];
						var mockParentComponent = { "mock": "parent-component" };

						var component = todoInputComponent.create( mockParentComponent, mockTodoList );
						
						component = React.renderComponent( component, $( "body" )[ 0 ] );

						return (
							"todoList" in component.props && 
							"parentComponent" in component.props &&
							_.isArray( component.props.todoList ) &&
							_.isEqual( component.props.todoList, mockTodoList ) &&
							_.isEqual( component.props.parentComponent, mockParentComponent )
						);
							
					}, function onResult( error, result ){

						assert.ok( result.value, self._runnable.title );
					} )
					.call( done );
			} );

		it( "should store the instance in the instance static property when create( true ) static method was called with onlyOnce parameter set to true",
			function testCase( done ){
				var self = this;

				client
					.url( "http://localhost:8080/" )
					.execute( function onExecute( ){
						var mockTodoList = [ "mock-todo-list" ];
						var mockParentComponent = { "mock": "parent-component" };

						var component = todoInputComponent.create( mockTodoList, mockParentComponent, true );

						return todoInputComponent.data.instance === component;

					}, function onResult( error, result ){
						assert.ok( result.value, self._runnable.title );
					} )
					.call( done );
			} );

		it( "should not store the instance in the instanceSet static property when create( true ) static method was called with onlyOnce parameter set to true",
			function testCase( done ){
				var self = this;

				client
					.url( "http://localhost:8080/" )
					.execute( function onExecute( ){
						var mockTodoList = [ "mock-todo-list" ];
						var mockParentComponent = { "mock": "parent-component" };

						var component = todoInputComponent.create( mockTodoList, mockParentComponent, true );

						return _.keys( todoInputComponent.data.instanceSet ).length == 0;

					}, function onResult( error, result ){
						assert.ok( result.value, self._runnable.title );
					} )
					.call( done );
			} );

		it( "should have todo as the initial state",
			function testCase( done ){
				var self = this;

				client
					.url( "http://localhost:8080/" )
					.execute( function retrieveInitialStateSet( ){
						var mockTodoList = [ "mock-todo-list" ];
						var mockParentComponent = { "mock": "parent-component" };

						var component = todoInputComponent.create( mockTodoList, mockParentComponent, true );

						var state = React.renderComponent( component, $( "body" )[ 0 ] ).state;

						return "todo" in state && _.isString( state.todo );	

					}, function onResult( error, result ){

						assert.ok( result.value, self._runnable.title );
					} )
					.call( done );
			} );

		it( "should show input when user types something",
			function testCase( done ){
				client
					.url( "http://localhost:8080/" )
					.setValue( ".todo-input", "Hello World" )
					.getValue( ".todo-input",
						function onResult( error, value ){
							should( value ).equal( "Hello World" );
						} )
					.saveScreenshot( "todo-input-test-shot-1.png" )
					.call( done );
			} );

		it( "should show input on todoList when the user press enter",
			function testCase( done ){
				client
					.url( "http://localhost:8080/" )
					.setValue( ".todo-input", "Hello World" )
					.saveScreenshot( "todo-input-test-shot-2-a.png" )
					.addValue( ".todo-input", "\n" )
					.elements( ".todo-item",
						function onResult( error, elements ){
							should( elements.value ).have.a.lengthOf( 1 );
						} )
					.getHTML( ".todo-item p",
						function onResult( error, html ){
							should( html ).containEql( "Hello World" );
						} )
					.saveScreenshot( "todo-input-test-shot-2-b.png" )
					.call( done );
			} );

		after( function onAfter( done ){
			client.end( done );
		} );
	} );