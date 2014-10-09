var gulp = require( "gulp" );
var react = require( "gulp-react" );
var mocha = require( "gulp-mocha" );
var wait = require( "gulp-wait" );
var clean = require( "gulp-clean" );
var livereload = require( "gulp-livereload" );
var embedlr = require( "gulp-embedlr" );
var rename = require( "gulp-rename" );

var connect = require( "connect" );
var serveStatic = require( "serve-static" );
var childprocess = require( "child_process" );
var argv = require( "yargs" ).argv;

gulp.task( "default", [ "clean-build", "build-module", "build-index" ] );

gulp.task( "clean-build",
	function cleanTask( ){
		return gulp
			.src( [ "js/build/*.js", "./index.html" ] )
			.pipe( clean( { "force": true } ) );
	} );

gulp.task( "build-module",
	[ "clean-build" ],
	function buildTask( ){
		return gulp
			.src( "js/component/*.js" )
			.pipe( react( ) )
			.pipe( gulp.dest( "js/build" ) );
	} );

gulp.task( "build-index",
	[ "clean-build", "build-module" ],
	function buildTask( ){
		return gulp
			.src( "./_index.html" )
			.pipe( embedlr( ) )
			.pipe( rename( "index.html" ) )
			.pipe( gulp.dest( "." ) );
	} );

var serverTask = { };
gulp.task( "server",
	[ "clean-build", "build-module", "build-index" ],
	function serverTask( done ){
		if( !serverTask.server ){
			serverTask.server = connect( );
			serverTask.server.use( serveStatic( "." ) ).listen( 8080, done );

		}else{
			done( );
		}
	} );

gulp.task( "server-qunit",
	[ "clean-build", "build-module", "build-index" ],
	function serverTask( done ){
		if( !serverTask.serverQunit ){
			serverTask.serverQunit = connect( );
			serverTask.serverQunit.use( serveStatic( "." ) ).listen( 9090, done );

		}else{
			done( );
		}
	} );

var seleniumTask = { };
gulp.task( "server-selenium",
	function serverTask( done ){
		if( !seleniumTask.task ){
			seleniumTask.task = childprocess.exec( "java -jar selenium-server-standalone-2.42.2.jar" );

			if( argv.seleniumLog ){
				seleniumTask.task.stdout.on( "data",
					function onData( data ){
						console.log( "" + data );
					} );

				seleniumTask.task.stderr.on( "data",
					function onData( data ){
						console.log( "" + data );
					} );	
			}
			
			process.on( "exit",
				function onExit( ){
					seleniumTask.task.kill( );
				} );
		}

		done( );
	} );

gulp.task( "clean-screenshot",
	function cleanTask( ){
		return gulp
			.src( "*.png" )
			.pipe( clean( { "force": true } ) )
	} );

gulp.task( "test",
	[ "clean-screenshot", "server", "server-selenium", "server-qunit" ],
	function testTask( ){
		return gulp
			.src( "test/*.js", { "read": false } )
			.pipe( wait( 1000 ) )
			.pipe( mocha( { "timeout": 5000 } ) );
	} );

gulp.task( "watch",
	[ "clean-screenshot", "build-module", "build-index", "server", "server-selenium", "server-qunit" ],
	function watchTask( ){
		var server = livereload( );

		gulp.watch( [ 
				"./js/component/*.js",
				"./_index.html",
				"./test/*.js",
				"./tdd/*.js",
				"./tdd/*.html"
			],
			[ "build-module", "build-index", "test" ] )
			.on( "change", 
				function onChanged( file ){
					server.changed( file.path );
				} );
	} );