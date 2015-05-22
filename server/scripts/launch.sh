#!/bin/bash

# moving to server folder
cd Desktop/node-oracledb/node-oracledb-api/server

# pulling from remote
cd .. && git pull

# relaunch server
cd server && node server.js

