#!/bin/bash
fname=$1
sed  -i "/\bpi ALL=NOPASSWD\b/d" $fname

