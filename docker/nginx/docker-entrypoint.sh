#!/bin/sh
set -eu

# shellcheck disable=SC2016
envsubst '${NGINX_HOST}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
