var Browser = require( "zombie" );
var should = require( "should" );
var util = require( "util" );

describe( "todoList",
	function testTodoApp( ){
		before( function onBefore( ){
			this.browser = new Browser( { "site": "http://localhost:8080/", "debug": true } ); 

			this.browser.on( "error",
				function onError( error ){
					console.error( error );
				} );

			this.browser.on( "console",
				function onConsole( level, message ){
					console.log( message );
				} );
		} );

		before( function onBefore( done ){
			var self = this;

			this.browser.visit( "/" );

			this.browser.wait( function onPageLoaded( window ){
				return window.document.querySelector( ".todo-list-container" );

			}, function callback( ){
				done( );
			} );
		} );

		it( "should show 5 list on todoList when the user inputs 5 todos",
			function testCase( ){
				var browser = this.browser;

				browser
					.fill( "input.todo-input", "Hello World\n" )
					.fill( "input.todo-input", "Hello Philippines\n" )
					.fill( "input.todo-input", "Hello America\n" )
					.fill( "input.todo-input", "Hello Japan\n" )
					.fill( "input.todo-input", "Hello China\n",
						function lastly( ){
							browser.window.console.log( util.inspect( browser.queryAll( ".todo-item" ) ) );
							should( browser.queryAll( ".todo-item" ) ).have.a.lengthOf( 6 );			
						} );
			} );

		after( function onAfter( ){
			this.browser.close( );
		} );
	} );