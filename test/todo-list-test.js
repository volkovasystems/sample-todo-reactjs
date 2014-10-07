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
					.click( ".todo-item:nth-child(2) button" )
					.elements( ".todo-item",
						function onResult( error, elements ){
							should( elements.value ).have.a.lengthOf( 3 );
						} )
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
					.click( ".todo-item:nth-child(1) button" )
					.elements( ".todo-item",
						function onResult( error, elements ){
							should( elements.value ).have.a.lengthOf( 3 );
						} )
					.call( done );
			} );

		after( function onAfter( done ){
			client.end( done );
		} );
	} );