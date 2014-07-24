#!/bin/bash
APP_PATH=$(dirname $(readlink -f ${BASH_SOURCE}))

LIB="memcached redis"
ACTION="set get set-get"
NODE=$(which node) || NODE=$(which nodejs)
SEQ="100000 300000 500000 700000 900000 1100000 1300000 1500000 1700000 1900000 2100000 2300000 2500000 2700000 2900000 3100000 3300000 3500000 3700000 3900000 4100000 4300000 4500000 4700000 4900000 5000000"

for lib in ${LIB}; do
    for action in ${ACTION}; do
	for i in ${SEQ}; do
	    ${NODE} ${APP_PATH}/node-${lib}-${action}.js ${i}
	    sleep 2
	done
	echo
    done
done

exit 0
