#!/bin/bash
set -x
echo "Setting iptables"
iptables -t nat -A PREROUTING -p tcp -m tcp -s 192.168.1.0/24 --dport 80 -j DNAT --to-destination 192.168.1.1:8088
iptables -t nat -A PREROUTING -p tcp -m tcp -s 192.168.1.0/24 --dport 443 -j DNAT --to-destination 192.168.1.1:8088
