#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <hiredis/hiredis.h>

int main ( int argc, char **argv ) {
  int MAX = 100;
  int i = 0;
  
  if ( argc > 1 &&
       atoi ( argv [ 1 ] ) > 0 ) {
    MAX = atoi ( argv [ 1 ] );
  }
  
  redisContext *c = redisConnect ( "127.0.0.1", 6379 );
  redisReply *reply;
  
  if (c != NULL &&
      c->err) {
    exit ( 5 );
  }

  unsigned START = (unsigned) time ( NULL );
  
  while ( i < MAX ) {
    reply = redisCommand ( c, "SET %d %d", MAX, MAX );
    freeReplyObject ( reply );
    i++;
  }
  
  unsigned END = (unsigned) time ( NULL );
  
  reply = redisCommand ( c,"DEL %d", MAX );
  freeReplyObject ( reply );
  
  printf ( "%d;%u\n", MAX, ( END - START ) );
  
  redisFree ( c );
    
  exit ( 0 );
}
