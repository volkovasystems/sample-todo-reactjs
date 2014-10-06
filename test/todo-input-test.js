var Browser = require( "zombie" );

describe( "todoInput",
	function testTodoApp( ){
		before( function onBefore( ){
			this.browser = new Browser( { "site": "http://localhost:8080/", "debug": true } ); 

			this.browser.on( "error",
				function onError( error ){
					console.error( error );
				} );
		} );

		before( function onBefore( done ){
			var self = this;

			this.browser.visit( "/" );

			this.browser.wait( function onPageLoaded( window ){
				return window.document.querySelector( ".todo-input-container" );

			}, function callback( ){
				done( );
			} );
		} );

		it( "should show input on todoList when the user press enter",
			function testCase( ){
				this.browser.fill( "input.todo-input", "Hello World\n",
					function onPressEnter( ){
						this.browser.assert.elements( ".todo-list-container", 1 );
					} );
			} );

		after( function onAfter( ){
			this.browser.close( );
		} );
	} );