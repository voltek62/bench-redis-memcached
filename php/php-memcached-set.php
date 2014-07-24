<?php
define ( 'MAX', ( ( array_key_exists ( 1, $argv ) && (int) $argv [ 1 ] > 0 ) ? (int) $argv [ 1 ] : 100 ) );

$m = new Memcached ();
$m->addServer ( 'localhost', 11211 );

define ( 'START', (int) microtime ( true ) * 1000 );

$counter = 0;
while ( $counter++ < MAX ) {
  $m->set ( $counter, $counter, time () + 1 );
} 

define ( 'END', (int) microtime ( true ) * 1000 );

$m->quit ();

printf ( "%s;%d\n", number_format ( $counter - 1, 0, '.', ' ' ), (int) ( END - START ) );

exit ( 0 );
