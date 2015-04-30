#!/bin/bash

# getting ip address of virtual machine
VALUE=`VBoxManage guestproperty get "Oracle DB Developer VM" "/VirtualBox/GuestInfo/Net/0/V4/IP"`
HOST=${VALUE#*: }

# login 
ORACLE='oracle'
ORACLE_PSW='oracle'

ssh 'oracle@'$HOST