#!/usr/bin/env python3          
                                
import signal                   
import sys
import RPi.GPIO as GPIO

import datetime
import time
global start


main_dir = "/home/pi/Documents/bsy-wifi/"

BUTTON_GPIO = 16
LED_GPIO = 21
def signal_handler(sig, frame):
    GPIO.cleanup()
    sys.exit(0)
    
def button_callback(channel):
    val_lst = []
    for i in range(9):
        val_lst.append(GPIO.input(BUTTON_GPIO))
        time.sleep(0.001)
        
    # print(val_lst)
    if sum(val_lst)>=5:
        val = 1
    else:
        val = 0
    
    global start
    if not val:
        start = datetime.datetime.now()
        print("Button pressed!")
    else:
        end = datetime.datetime.now()
        elapsed = end - start
        print("Button released!")
        print(elapsed.total_seconds())
        with open(main_dir + 'tmp/button_pressed.txt','w') as f:
            f.write(str(elapsed.total_seconds()))
            
        
if __name__ == '__main__':
    global start 
    start = datetime.datetime.now()
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(BUTTON_GPIO, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    
    GPIO.setup(LED_GPIO, GPIO.OUT)
    
    GPIO.add_event_detect(BUTTON_GPIO, GPIO.BOTH, 
            callback=button_callback, bouncetime=10)
    
     

    while 1:
        with open(main_dir +'tmp/connection_status.txt','r') as f:
            if f.read()[0]== '1':
                GPIO.output(LED_GPIO, True)
            else:
                GPIO.output(LED_GPIO, False)
        time.sleep(0.5)

    
    signal.signal(signal.SIGINT, signal_handler)
    signal.pause()
