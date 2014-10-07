var webdriver = require( "webdriverio" );
var assert = require( "assert" );
var should = require( "should" );

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

		it( "should show input when user types something",
			function testCase( done ){
				client
					.url( "http://localhost:8080/" )
					.setValue( ".todo-input", "Hello World" )
					.getValue( ".todo-input",
						function onResult( error, value ){
							should( value ).equal( "Hello World" );
						} )
					.call( done );
			} );

		it( "should show input on todoList when the user press enter",
			function testCase( done ){
				client
					.url( "http://localhost:8080/" )
					.setValue( ".todo-input", "Hello World\n" )
					.elements( ".todo-item",
						function onResult( error, elements ){
							should( elements.value ).have.a.lengthOf( 1 );
						} )
					.getHTML( ".todo-item p",
						function onResult( error, html ){
							should( html ).containEql( "Hello World" );
						} )
					.call( done );
			} );

		after( function onAfter( done ){
			client.end( done );
		} );
	} );