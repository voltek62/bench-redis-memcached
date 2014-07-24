var time = function () {
    return parseInt ( new Date ().getTime () / 1000 );
};

var MAX = 100;
if ( typeof process.argv [ 2 ] !== 'undefined' &&
     parseInt ( process.argv [ 2 ] ) > 0 ) {
    MAX = parseInt ( process.argv [ 2 ] );
}

var counter = 0;

var START = time ();

var Memcached = require ( 'memcached' );
var m = new Memcached ( 'localhost:11211' );

var set = function () {
    m.set ( counter, counter, 3600, function ( err, result ) {
	m.get ( counter, function ( err, data ) {
	    m.del ( counter );
	    if ( counter++ < ( MAX - 1 ) ) {
		set ();
	    } else {
		end ();
	    }
	} );
    } );
};

var end = function () {
    var END = time ();
    console.log ( ( counter - 1 ) + ';' + parseInt ( END - START ) );
    m.end ();
};

set ();

