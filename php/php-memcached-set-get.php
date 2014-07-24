<?php
define ( 'MAX', ( ( array_key_exists ( 1, $argv ) && (int) $argv [ 1 ] > 0 ) ? (int) $argv [ 1 ] : 100 ) );

$m = new Memcached ();
$m->addServer ( 'localhost', 11211 );

define ( 'START', time () );

$counter = 0;
while ( $counter++ < MAX ) {
  $m->set ( MAX, MAX, 0 );
  $t = $m->get ( MAX );
  $m->delete ( MAX );
}

define ( 'END', time () );

$m->quit ();

printf ( "%s;%d\n", number_format ( $counter - 1, 0, '.', ' ' ), (int) ( END - START ) );

exit ( 0 );
