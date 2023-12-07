#!/usr/bin/env python3          
                                
import signal                   
import sys
import os

import datetime
import time
global start


main_dir = "/home/pi/Documents/bsy-wifi/"

BUTTON_GPIO = 12
R_LED_GPIO = 7
G_LED_GPIO = 5
B_LED_GPIO = 3


def GPIO_output(pin,val):
     os.system("sudo mraa-gpio  set {}  {}".format(pin,int(val)))

            
        
if __name__ == '__main__':
    global start 
    start = datetime.datetime.now()

    
    GPIO_output(R_LED_GPIO, False)
    GPIO_output(G_LED_GPIO, False)
    GPIO_output(B_LED_GPIO, False)
    
    
     

    while 1:
        with open(main_dir +'tmp/connection_status.txt','r') as f:
            c = f.read()[0]
        with open(main_dir +'tmp/meeting_status.txt','r') as f:
            m = f.read()[0]
                
        if c== '1':
            GPIO_output(R_LED_GPIO, True)
            GPIO_output(G_LED_GPIO, False)
            GPIO_output(B_LED_GPIO, False)
        elif c== '0' and m=='0':
            GPIO_output(R_LED_GPIO, False)
            GPIO_output(G_LED_GPIO, False)
            GPIO_output(B_LED_GPIO, True)
        elif m== '1':
            GPIO_output(R_LED_GPIO, False)
            GPIO_output(G_LED_GPIO, True)
            GPIO_output(B_LED_GPIO, False)
        else:
            GPIO_output(R_LED_GPIO, False)
            GPIO_output(G_LED_GPIO, False)
            GPIO_output(B_LED_GPIO, False)
        time.sleep(0.5)

