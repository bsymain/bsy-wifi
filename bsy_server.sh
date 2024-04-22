#!/bin/bash
set -x
echo "Starting Redirection"
#exec python3 -m http.server 8080
sleep 1
python3   ./bsy_redirect.py 8088 http://192.168.1.1:8080 &
pid=$!
echo "Starting Server"
node ./bsy_input.js
sleep 1
kill $pid
