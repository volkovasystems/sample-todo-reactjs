var gulp = require( "gulp" );
var replace = require( "gulp-replace" );
var clean = require( "gulp-clean" );
var filter = require( "gulp-filter" );

const MODULE_PATTERN = /\s\/\/\:\s*(module\.exports\s*\=\s*[a-zA-Z]+\s*\;)/g;
const REQUIRE_PATTERN = /\s\/\/\:\s*(var\s*[a-zA-Z]+\s*\=\s*require\(\s*\"[-\/a-zA-Z]+(?:\.js)?\"\s*\)\s*\;)/g;

gulp.task( "default", [ "clean-test", "enable-module" ] );

gulp.task( "clean-test",
	function cleanTask( ){
		return gulp
			.src( "test/*.js" )
			.pipe( filter( "!*-test.js" ) )
			.pipe( clean( { "force": true } ) )
	} );

gulp.task( "enable-module",
	[ "clean-test" ],
	function enableTask( ){
		return gulp
			.src( "js/component/*.js" )
			.pipe( replace( MODULE_PATTERN, "\n$1" ) )
			.pipe( replace( REQUIRE_PATTERN, "\n$1" ) )
			.pipe( gulp.dest( "test" ) );
	} );