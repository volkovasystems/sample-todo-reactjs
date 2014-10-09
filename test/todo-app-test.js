var webdriver = require( "webdriverio" );
var assert = require( "assert" );
var should = require( "should" );

describe( "todoApp",
	function testTodoApp( ){

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

		it( "should have a todoApp ReactJS component class",
			function testCase( done ){
				var self = this;

				client
					.url( "http://localhost:8080/" )
					.execute( function onExecute( ){

						return (
							"todoApp" in window && 
							typeof window[ "todoApp" ] == "function" &&
							React.addons.TestUtils.isDescriptorOfType( todoApp( ), todoApp )
						);	

					}, function onResult( error, result ){
						assert.ok( result.value, self._runnable.title );
					} )
					.call( done );
			} );

		it( "should return a todoApp component instance when create( ) static method was called",
			function testCase( done ){
				var self = this;

				client
					.url( "http://localhost:8080/" )
					.execute( function onExecute( ){
						var component = todoApp.create( );

						return React.addons.TestUtils.isDescriptorOfType( component, todoApp );

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
						todoApp.emptyData( );

						var component = todoApp.create( false, "mockComponent" );

						return (
							todoApp.data.instanceSet[ "mockComponent" ] === component &&
							_.keys( todoApp.data.instanceSet ).length == 1
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
						todoApp.emptyData( );

						var component = todoApp.create( true );

						return todoApp.data.instance === component;

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
						todoApp.emptyData( );

						var component = todoApp.create( true );

						return _.keys( todoApp.data.instanceSet ).length == 0;

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
						
						var component = todoApp.create( true );

						var state = React.renderComponent( component, $( "body" )[ 0 ] ).state;

						return "todoList" in state && _.isArray( state.todoList );	

					}, function onResult( error, result ){

						assert.ok( result.value, self._runnable.title );
					} )
					.call( done );
			} );

		// it( "should create todoInput and todoList",
		// 	function testCase( done ){
		// 		var self = this;

		// 		client
		// 			.url( "http://localhost:8080/" )
		// 			.execute( function retrieveInitialStateSet( ){
						
		// 				var component = todoApp.create( true );

		// 				var state = React.renderComponent( component, $( "section.todo-app" )[ 0 ] ).state;

		// 				return todoInputComponent.

		// 			}, function onResult( error, result ){

		// 				assert.ok( result.value, self._runnable.title );
		// 			} )
		// 			.call( done );
		// 	} );

		it( "should render todoApp, todoInput and todoList",
			function testCase( done ){
				client
					.url( "http://localhost:8080/" )
					.getAttribute( ".todo-app-container", "class",
						function onResult( error, attribute ){
							should( attribute ).containEql( "todo-app-container" );
						} )
					.getAttribute( ".todo-input-container", "class",
						function onResult( error, attribute ){
							should( attribute ).containEql( "todo-input-container" );
						} )
					.getAttribute( ".todo-list-container", "class",
						function onResult( error, attribute ){
							should( attribute ).containEql( "todo-list-container" );
						} )
					.saveScreenshot( "todo-app-test-shot-1.png" )
					.call( done );
			} );

		after( function onAfter( done ){
			client.end( done );
		} );
	} );