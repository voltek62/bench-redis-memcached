CC=gcc
CFLAGS=-Wall
CLIBS=-lhiredis -lmemcached
BIN_LST=c-memcached-get c-memcached-set c-memcached-set-get c-redis-get c-redis-set c-redis-set-get

all: ${BIN_LST}

%: %.c
	${CC} -o $@ ${CLIBS} $@.c ${CFLAGS}

clean: 
	rm -f ${BIN_LST}
