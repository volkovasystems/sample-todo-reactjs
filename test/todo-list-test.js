var webdriver = require( "webdriverio" );
var assert = require( "assert" );
var should = require( "should" );

describe( "todoList",
	function testTodoList( ){

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

		it( "should have a todoListComponent ReactJS component class",
			function testCase( done ){
				var self = this;

				client
					.url( "http://localhost:8080/" )
					.execute( function onExecute( ){

						return (
							"todoListComponent" in window && 
							typeof window[ "todoListComponent" ] == "function" &&
							React.addons.TestUtils.isDescriptorOfType( todoListComponent( ), todoListComponent )
						);

					}, function onResult( error, result ){
						assert.ok( result.value, self._runnable.title );
					} )
					.call( done );
			} );

		it( "should return a todoListComponent component instance when create( ) static method was called",
			function testCase( done ){
				var self = this;

				client
					.url( "http://localhost:8080/" )
					.execute( function onExecute( ){
						var component = todoListComponent.create( );

						return React.addons.TestUtils.isDescriptorOfType( component, todoListComponent );

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
						todoListComponent.emptyData( );

						var mockTodoList = [ "mock-todo-list" ];
						var mockParentComponent = { "mock": "parent-component" };

						var component = todoListComponent.create( mockTodoList, mockParentComponent, false, "mockComponent" );

						return (
							todoListComponent.data.instanceSet[ "mockComponent" ] === component && 
							_.keys( todoListComponent.data.instanceSet ).length == 1
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

						var component = todoListComponent.create( mockParentComponent, mockTodoList );
						
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

						var component = todoListComponent.create( mockTodoList, mockParentComponent, true );

						return todoListComponent.data.instance === component;

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

						var component = todoListComponent.create( mockTodoList, mockParentComponent, true );

						return _.keys( todoListComponent.data.instanceSet ).length == 0;

					}, function onResult( error, result ){
						assert.ok( result.value, self._runnable.title );
					} )
					.call( done );
			} );

		it( "should have todoList as the initial state",
			function testCase( done ){
				var self = this;

				client
					.url( "http://localhost:8080/" )
					.execute( function retrieveInitialStateSet( ){
						var mockTodoList = [ "mock-todo-list" ];
						var mockParentComponent = { "mock": "parent-component" };

						var component = todoListComponent.create( mockTodoList, mockParentComponent, true );

						var state = React.renderComponent( component, $( "body" )[ 0 ] ).state;

						return "todoList" in state && _.isArray( state.todoList );	

					}, function onResult( error, result ){

						assert.ok( result.value, self._runnable.title );
					} )
					.call( done );
			} );

		it( "should increment list when user add 3 succeeding todo",
			function testCase( done ){
				client
					.url( "http://localhost:8080/" )
					.setValue( ".todo-input", "Hello World\n" )
					.elements( ".todo-item",
						function onResult( error, elements ){
							should( elements.value ).have.a.lengthOf( 1 );
						} )
					.getHTML( ".todo-item small",
						function onResult( error, html ){
							should( html ).containEql( "1" );
						} )
					.getHTML( ".todo-item p",
						function onResult( error, html ){
							should( html ).containEql( "Hello World" );
						} )
					.saveScreenshot( "todo-list-test-shot-1-a.png" )
					.setValue( ".todo-input", "Hello Philippines\n" )
					.elements( ".todo-item",
						function onResult( error, elements ){
							should( elements.value ).have.a.lengthOf( 2 );
						} )
					.getHTML( ".todo-item:nth-child(2) small",
						function onResult( error, html ){
							should( html ).containEql( "2" );
						} )
					.getHTML( ".todo-item:nth-child(2) p",
						function onResult( error, html ){
							should( html ).containEql( "Hello Philippines" );
						} )
					.saveScreenshot( "todo-list-test-shot-1-b.png" )
					.setValue( ".todo-input", "Hello America\n" )
					.elements( ".todo-item",
						function onResult( error, elements ){
							should( elements.value ).have.a.lengthOf( 3 );
						} )
					.getHTML( ".todo-item:nth-child(3) small",
						function onResult( error, html ){
							should( html ).containEql( "3" );
						} )
					.getHTML( ".todo-item:nth-child(3) p",
						function onResult( error, html ){
							should( html ).containEql( "Hello America" );
						} )
					.saveScreenshot( "todo-list-test-shot-1-c.png" )
					.call( done );
			} );

		it( "should remove \"Hello Philippines\" todo when the user clicks the close button on that todo item",
			function testCase( done ){
				client
					.url( "http://localhost:8080/" )
					.setValue( ".todo-input", "Hello World\n" )
					.setValue( ".todo-input", "Hello Philippines\n" )
					.setValue( ".todo-input", "Hello America\n" )
					.setValue( ".todo-input", "Hello Japan\n" )
					.elements( ".todo-item",
						function onResult( error, elements ){
							should( elements.value ).have.a.lengthOf( 4 );
						} )
					.saveScreenshot( "todo-list-test-shot-2-a.png" )
					.click( ".todo-item:nth-child(2) button" )
					.elements( ".todo-item",
						function onResult( error, elements ){
							should( elements.value ).have.a.lengthOf( 3 );
						} )
					.saveScreenshot( "todo-list-test-shot-2-b.png" )
					.call( done );
			} );

		it( "should remove all \"Hello World\" todos when the user clicks the close button at one of any of that todo item",
			function testCase( done ){
				client
					.url( "http://localhost:8080/" )
					.setValue( ".todo-input", "Hello World\n" )
					.setValue( ".todo-input", "Hello Philippines\n" )
					.setValue( ".todo-input", "Hello America\n" )
					.setValue( ".todo-input", "Hello World\n" )
					.setValue( ".todo-input", "Hello Japan\n" )
					.setValue( ".todo-input", "Hello World\n" )
					.setValue( ".todo-input", "Hello World\n" )
					.elements( ".todo-item",
						function onResult( error, elements ){
							should( elements.value ).have.a.lengthOf( 7 );
						} )
					.saveScreenshot( "todo-list-test-shot-3-a.png" )
					.click( ".todo-item:nth-child(1) button" )
					.elements( ".todo-item",
						function onResult( error, elements ){
							should( elements.value ).have.a.lengthOf( 3 );
						} )
					.saveScreenshot( "todo-list-test-shot-3-b.png" )
					.call( done );
			} );

		after( function onAfter( done ){
			client.end( done );
		} );
	} );