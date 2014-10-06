var Browser = require( "zombie" );

describe( "todoApp",
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
				return window.document.querySelector( ".todo-app-container" );

			}, function callback( ){
				done( );
			} );
		} );

		it( "should render todoApp, todoInput and todoList",
			function testCase( ){
				this.browser.assert.element( ".todo-app-container" );
				this.browser.assert.element( ".todo-input-container" );
				this.browser.assert.element( ".todo-list-container" );
			} );

		after( function onAfter( ){
			this.browser.close( );
		} );
	} );