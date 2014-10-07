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
					.call( done );
			} );

		after( function onAfter( done ){
			client.end( done );
		} );
	} );