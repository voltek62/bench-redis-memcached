<?php
define ( 'MAX', ( ( array_key_exists ( 1, $argv ) && (int) $argv [ 1 ] > 0 ) ? (int) $argv [ 1 ] : 100 ) );

$r = new Redis ();
$r->connect ( '127.0.0.1', 6379 );

define ( 'START', time () );

$counter = 0;
while ( $counter++ < MAX ) {
  $r->setex ( $counter, 1, $counter );
}

define ( 'END', time () );

$r->close ();

printf ( "%s;%d\n", number_format ( $counter - 1, 0, '.', ' ' ), (int) ( END - START ) );

exit ( 0 );
