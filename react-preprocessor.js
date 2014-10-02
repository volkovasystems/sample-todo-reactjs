var ReactTools = require( "react-tools" );

module.exports = {
	"process": function process( src ){
		return ReactTools.transform( src );
	}
};	