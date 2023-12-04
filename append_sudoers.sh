#!/bin/bash
fname=$2

./clean_sudoers.sh $fname


echo "pi ALL=NOPASSWD: $(pwd)/bsy_iptable_config.sh
pi ALL=NOPASSWD: $(pwd)/bsy_iptable_clear.sh
pi ALL=NOPASSWD: /usr/local/bin/mraa-gpio
" | tee -a $fname



 #~ "pi ALL=NOPASSWD: /home/pi/Documents/scripts/redirect.sh
#~ pi ALL=NOPASSWD: /home/pi/Documents/scripts/iptableConfig.sh
#~ pi ALL=NOPASSWD: /home/pi/Documents/scripts/iptableConfig2.sh
#~ pi ALL=NOPASSWD: /home/pi/Documents/scripts/iptableClear.sh
#~ " | 
