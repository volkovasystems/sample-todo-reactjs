if( typeof process != "undefined" ){
	var QUnit = require( "qunit-cli" );
	var webdriver = require( "webdriverio" );
	var should = require( "should" );
}

QUnit.module( "todoApp ReactJS component class.", {
	"setup": function setup( ){
		todoInputComponent = {
			"create": function create( ){ }
		};
		todoInputComponent.create = sinon.spy( todoInputComponent, "create" );

		todoListComponent = {
			"create": function create( ){ }
		};
		todoListComponent.create = sinon.spy( todoListComponent, "create" );

		if( $( "section.todo-app" ).children( ).length ){
			$( "section.todo-app" ).empty( );

		}else{
			todoAppRenderedObject = todoApp.render( );
		}

		jshm = JsHamcrest.Matchers;
	},

	"teardown": function teardown( ){
		if( $( "section.todo-app" ).children( ).length ){
			React.unmountComponentAtNode( $( "section.todo-app" )[ 0 ] );
			$( "section.todo-app" ).empty( );

			todoInputComponent.create.reset( );
			todoListComponent.create.reset( );	
		}
	}
} );
QUnit.test( "todoApp should be a global namespace.",
	function testCase( assert ){
		assert.ok( "todoApp" in window, "todoApp is a global namespace." );
	} );
QUnit.test( "todoApp should be a function.",
	function testCase( assert ){
		assert.ok( typeof window[ "todoApp" ] == "function", "todoApp is a function." );
	} );
QUnit.test( "Calling todoApp( ) should return a descriptor of type todoApp",
	function testCase( assert ){
		assert.ok( React.addons.TestUtils.isDescriptorOfType( todoApp( ), todoApp ), "todoApp( ) returns a descriptor of todoApp." );
	} );
QUnit.test( "todoApp should load todoInputComponent.",
	function testCase( assert ){
		assert.ok( todoInputComponent.create.calledOnce, "todoInputComponent is called once on every todoApp initialization." );

	} );
QUnit.test( "todoApp should load todoListComponent.",
	function testCase( assert ){
		assert.ok( todoListComponent.create.calledOnce, "todoListComponent is called once on every todoApp initialization." );
	} );