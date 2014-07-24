<?php
define ( 'MAX', ( ( array_key_exists ( 1, $argv ) && (int) $argv [ 1 ] > 0 ) ? (int) $argv [ 1 ] : 100 ) );

$r = new Redis ();
$r->connect ( '127.0.0.1', 6379 );
$r->setex ( MAX, 3600, MAX );

define ( 'START', time () );

$counter = 0;
while ( $counter++ < MAX ) {
  $t = $r->get ( MAX );
}

define ( 'END', time () );

$r->del ( MAX );
$r->close ();

printf ( "%s;%d\n", number_format ( $counter - 1, 0, '.', ' ' ), (int) ( END - START ) );

exit ( 0 );
