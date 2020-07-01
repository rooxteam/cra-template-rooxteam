#!/bin/sh
set -e

envsubst "$(printf '${%s} ' $(env | sed 's/=.*//' | grep '^REACT_APP_'))" < /etc/nginx/conf.d/default.conf.tpl > /etc/nginx/conf.d/default.conf
envsubst "$(printf '${%s} ' $(env | sed 's/=.*//' | grep '^REACT_APP_'))" < /usr/share/nginx/html/config.json.tpl > /usr/share/nginx/html/config.json

#printf "Passed Envs:\n"
#printf '%s ' $(env | sed 's/=.*//' | grep '^REACT_APP_')
#printf "\n/Envs:\n"

printf "You can now view your app in the browser\n"
printf "\n"
printf "\thttp://localhost:8080/\n"
exec nginx -g 'daemon off;'

