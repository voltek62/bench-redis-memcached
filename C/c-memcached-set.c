#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <libmemcached/memcached.h>

int main ( int argc, char **argv ) {
  int MAX = 100;
  int i = 0;
  
  if ( argc > 1 &&
       atoi ( argv [ 1 ] ) > 0 ) {
    MAX = atoi ( argv [ 1 ] );
  }
  
  memcached_server_st *servers = NULL;
  memcached_st *memc;
  memcached_return rc;
  char iChar[20];
  
  memc = memcached_create ( NULL );
  servers = memcached_server_list_append ( servers, "localhost", 11211, &rc );
  rc = memcached_server_push ( memc, servers );

  if ( rc != MEMCACHED_SUCCESS ) {
    exit ( 1 );
  }
  
  unsigned START = (unsigned) time ( NULL );
  
  while ( i < MAX ) {
    sprintf ( iChar, "%d", MAX );
    
    rc = memcached_set ( memc,
			 iChar,
			 strlen ( iChar ),
			 iChar,
			 strlen ( iChar ),
			 (time_t) 1,
			 (uint32_t) 0 );
    
    i++;
  }
  
  unsigned END = (unsigned) time ( NULL );
  printf ( "%d;%u\n", MAX, ( END - START ) );
  
  memcached_quit ( memc );
  
  exit ( 0 );
}
