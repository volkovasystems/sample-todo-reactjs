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

gulp.task( "default", [ "clean-build", "build-module", "build-index" ] );

gulp.task( "clean-build",
	function cleanTask( ){
		return gulp
			.src( [ "js/build/*.js", "./index.html" ] )
			.pipe( clean( { "force": true } ) );
	} );

gulp.task( "build-module",
	function buildTask( ){
		return gulp
			.src( "js/component/*.js" )
			.pipe( react( ) )
			.pipe( gulp.dest( "js/build" ) );
	} );

gulp.task( "build-index",
	function buildTask( ){
		return gulp
			.src( "./_index.html" )
			.pipe( embedlr( ) )
			.pipe( rename( "index.html" ) )
			.pipe( gulp.dest( "." ) );
	} );

gulp.task( "test", 
	function testTask( ){
		return gulp
			.src( "test/*.js", { "read": false } )
			.pipe( wait( 1000 ) )
			.pipe( mocha( { "timeout": 5000 } ) );
	} );

gulp.task( "server",
	function serverTask( done ){
		var server = connect( );
		server.use( serveStatic( "." ) ).listen( 8080, done );
	} );

gulp.task( "watch",
	[ "build-module", "build-index", "server" ],
	function watchTask( ){
		var server = livereload( );

		gulp.watch( [ 
				"./js/component/*.js",
				"./_index.html",
				"./test/*.js"
			],
			[ "build-module", "build-index", "test" ] )
			.on( "change", 
				function onChanged( file ){
					server.changed( file.path );
				} );
	} );