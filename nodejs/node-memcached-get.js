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

var get = function () {
    m.get ( MAX, function ( err, data ) {
	if ( counter++ < MAX ) {
	    get ();
	} else {
	    end ();
	}
    } );
};

var end = function () {
    var END = time ();
    console.log ( ( counter - 1 ) + ';' + parseInt ( END - START ) );
    m.del ( MAX );
    m.end ();
};

m.set ( MAX, MAX, 3600, function ( err, result ) {
    get ();
} );
