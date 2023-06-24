#!/bin/bash
echo "Clearing iptables"
iptables -t nat -D PREROUTING 1
iptables -t nat -D PREROUTING 1
