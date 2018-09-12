#!/bin/bash

# build
cd ~/11mic

#rm dist dir
rm -rf dist

#build to dist
npm run build

#connect to server

sshpass -e sftp root@47.99.81.169 << !
    cd /data/wwwroot/xApiManager/public
    put -r dist/*
!