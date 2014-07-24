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

var redis = require ( 'redis' );
var r =  redis.createClient ( 6379, 'localhost' );

var get = function () {
    r.get ( MAX, function ( err, result ) {
	if ( counter++ < ( MAX - 1 ) ) {
	    get ();
	} else {
	    end ();
	}
    } );
};

var end = function () {
    var END = time ();
    console.log ( counter + ';' + parseInt ( END - START ) );
    r.end ();
};

r.set ( MAX, MAX, function ( err, res ) {
    r.expire ( MAX, 3600 );
    get ();
} );
